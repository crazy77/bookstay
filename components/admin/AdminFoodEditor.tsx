'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import type {
  FoodCatalog,
  FoodCatalogCategory,
  FoodCatalogSpot,
} from '@/data/food-catalog';
import { AdminHeader, AdminMenuButton } from '@/components/admin/AdminHeader';
import { getSupabaseBrowser } from '@/lib/supabase';

type Locale = 'ko' | 'en' | 'zh';

const LOCALES: Array<{ key: Locale; label: string }> = [
  { key: 'ko', label: '한국어' },
  { key: 'en', label: 'English' },
  { key: 'zh', label: '中文' },
];

const emptyText = { ko: '', en: '', zh: '' };

export function AdminFoodEditor() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [catalog, setCatalog] = useState<FoodCatalog>({ categories: [] });
  const [original, setOriginal] = useState<FoodCatalog>({ categories: [] });
  const [activeLocale, setActiveLocale] = useState<Locale>('ko');
  const [activeCategory, setActiveCategory] = useState(0);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const supabase = useMemo(() => {
    try {
      return getSupabaseBrowser();
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      setMessage('Supabase 환경 변수가 아직 설정되지 않았습니다.');
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!session) return;
    void loadCatalog(session.access_token);
  }, [session]);

  const dirty = JSON.stringify(catalog) !== JSON.stringify(original);
  const category = catalog.categories[activeCategory];

  useEffect(() => {
    if (!dirty) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirty]);

  async function loadCatalog(token: string) {
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/admin/food', {
      headers: { authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(`불러오기 실패: ${json.error ?? res.statusText}`);
      return;
    }

    setCatalog(json.catalog);
    setOriginal(json.catalog);
    setActiveCategory(0);
  }

  async function signIn() {
    if (!supabase) return;
    setMessage('');
    setLoading(true);
    const result = password
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: `${window.location.origin}/admin/food` },
        });
    setLoading(false);
    if (result.error) setMessage(result.error.message);
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  }

  async function save(seedDefaults = false) {
    if (!session) return;
    setSaving(true);
    setMessage('');
    const res = await fetch('/api/admin/food', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${session.access_token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(seedDefaults ? { seedDefaults: true } : { catalog }),
    });
    const json = await res.json();
    setSaving(false);

    if (!res.ok) {
      setMessage(`저장 실패: ${json.error ?? res.statusText}`);
      return;
    }
    setMessage(seedDefaults ? '기본 맛집 데이터를 저장했습니다.' : '맛집 데이터를 저장했습니다.');
    await loadCatalog(session.access_token);
  }

  function updateCatalog(next: FoodCatalog) {
    setCatalog(next);
    if (activeCategory >= next.categories.length) {
      setActiveCategory(Math.max(0, next.categories.length - 1));
    }
  }

  function updateCategory(index: number, nextCategory: FoodCatalogCategory) {
    updateCatalog({
      categories: catalog.categories.map((item, i) => (i === index ? nextCategory : item)),
    });
  }

  if (loading) return <AdminShell message="불러오는 중입니다." />;
  if (!supabase) return <AdminShell message={message} />;

  if (!session) {
    return (
      <AdminShell message={message}>
        <div className="flex min-h-screen items-center justify-center px-5 py-10">
          <div className="w-full max-w-sm rounded-lg border border-[#d8d0c1] bg-white p-6 shadow-sm">
            <p className="mb-1 text-xs uppercase tracking-[0.18em] text-[#746c60]">
              Haemyo
            </p>
            <h1 className="mb-6 text-xl font-semibold">맛집 관리자</h1>
            <label className="mb-3 block text-sm">
              이메일
              <input
                className="mt-1 w-full rounded-md border border-[#d8d0c1] px-3 py-2 outline-none focus:border-[#2f4f46]"
                value={email}
                type="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label className="mb-5 block text-sm">
              비밀번호
              <input
                className="mt-1 w-full rounded-md border border-[#d8d0c1] px-3 py-2 outline-none focus:border-[#2f4f46]"
                value={password}
                type="password"
                placeholder="비워두면 매직링크 전송"
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <button
              className="w-full rounded-md bg-[#2f4f46] px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              type="button"
              onClick={signIn}
              disabled={!email}
            >
              로그인
            </button>
          </div>
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell message={message}>
      <AdminHeader
        title="맛집 관리"
        status={`${dirty ? '저장되지 않은 변경이 있습니다.' : '모든 변경이 저장됐습니다.'} · ${session.user.email}`}
        active="food"
        primaryLabel={saving ? '저장 중' : '저장'}
        primaryDisabled={saving || !dirty}
        onPrimary={() => save()}
        menuItems={
          <>
              <a
              className="rounded px-3 py-2 text-sm hover:bg-[#f1eadf]"
                href="/guide"
                target="_blank"
                rel="noreferrer"
              >
                사이트 보기
              </a>
            <AdminMenuButton onClick={() => save(true)} disabled={saving}>
                    기본값 저장
            </AdminMenuButton>
            <AdminMenuButton
              onClick={() => {
                setCatalog(original);
                setMessage('변경 사항을 취소했습니다.');
              }}
              disabled={saving || !dirty}
            >
                    변경 취소
            </AdminMenuButton>
            <AdminMenuButton onClick={signOut}>로그아웃</AdminMenuButton>
          </>
        }
      >
        <div className="grid grid-cols-[6.8rem_minmax(0,1fr)_6.8rem] gap-2 md:grid-cols-[auto_1fr_auto] md:items-center">
          <div className="flex min-w-0 rounded-md border border-[#bdb3a2] bg-[#f7f3ea] p-0.5">
            {LOCALES.map(({ key, label }) => (
                  <button
                    key={key}
                aria-label={label}
                title={label}
                className={`h-8 min-w-0 flex-1 rounded px-1 text-sm md:px-2 ${
                      activeLocale === key ? 'bg-white shadow-sm' : 'text-[#746c60]'
                    }`}
                    type="button"
                    onClick={() => setActiveLocale(key)}
                  >
                {key === 'ko' ? '한' : key === 'en' ? 'E' : '中'}
                  </button>
                ))}
              </div>

          <select
            className="h-9 min-w-0 rounded-md border border-[#d8d0c1] bg-white px-2 text-sm outline-none focus:border-[#2f4f46]"
            value={activeCategory}
            onChange={(event) => setActiveCategory(Number(event.target.value))}
          >
            {catalog.categories.map((item, index) => (
              <option key={item.id} value={index}>
                {item.title.ko || item.id}
                {!item.published ? ' (숨김)' : ''}
              </option>
            ))}
          </select>

            <button
            className="h-9 rounded-md border border-[#bdb3a2] px-2 text-sm"
              type="button"
              onClick={() => {
                updateCatalog({
                  categories: [...catalog.categories, newCategory()],
                });
                setActiveCategory(catalog.categories.length);
              }}
            >
              카테고리 추가
            </button>
          </div>
      </AdminHeader>

      <main className="mx-auto max-w-7xl px-5 py-6">

        {category ? (
          <CategoryEditor
            category={category}
            locale={activeLocale}
            onChange={(next) => updateCategory(activeCategory, next)}
            onMove={(direction) => {
              const to = activeCategory + direction;
              if (to < 0 || to >= catalog.categories.length) return;
              updateCatalog({ categories: moveItem(catalog.categories, activeCategory, to) });
              setActiveCategory(to);
            }}
            onDelete={() => updateCatalog({ categories: catalog.categories.filter((_, i) => i !== activeCategory) })}
          />
        ) : (
          <section className="rounded-lg border border-[#d8d0c1] bg-white p-6">
            <p className="text-sm text-[#746c60]">카테고리를 추가해 주세요.</p>
          </section>
        )}
      </main>
    </AdminShell>
  );
}

function CategoryEditor({
  category,
  locale,
  onChange,
  onMove,
  onDelete,
}: {
  category: FoodCatalogCategory;
  locale: Locale;
  onChange: (category: FoodCatalogCategory) => void;
  onMove: (direction: -1 | 1) => void;
  onDelete: () => void;
}) {
  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-[#d8d0c1] bg-white p-4">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-semibold">카테고리</h2>
          <div className="flex gap-2">
            <button className="rounded-md border border-[#bdb3a2] px-2 py-1 text-xs" type="button" onClick={() => onMove(-1)}>위</button>
            <button className="rounded-md border border-[#bdb3a2] px-2 py-1 text-xs" type="button" onClick={() => onMove(1)}>아래</button>
            <button className="rounded-md border border-[#bdb3a2] px-2 py-1 text-xs" type="button" onClick={onDelete}>삭제</button>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          <TextField label="제목" value={category.title[locale]} onChange={(value) => onChange({ ...category, title: { ...category.title, [locale]: value } })} />
          <TextField label="카테고리 ID" value={category.id} onChange={(value) => onChange({ ...category, id: slugify(value) })} />
        </div>
        <TextArea label="카테고리 메모" value={category.note?.[locale] ?? ''} onChange={(value) => onChange({ ...category, note: { ...(category.note ?? emptyText), [locale]: value } })} />
        <div className="mt-3 flex gap-4 text-sm">
          <label className="flex items-center gap-2">
            <input checked={category.published} type="checkbox" onChange={(event) => onChange({ ...category, published: event.target.checked })} />
            노출
          </label>
          <label className="flex items-center gap-2">
            <input checked={Boolean(category.drive)} type="checkbox" onChange={(event) => onChange({ ...category, drive: event.target.checked || undefined })} />
            차량 이동 섹션
          </label>
        </div>
      </div>

      <div className="rounded-lg border border-[#d8d0c1] bg-white p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">맛집</h2>
          <button className="rounded-md border border-[#bdb3a2] px-3 py-2 text-sm" type="button" onClick={() => onChange({ ...category, spots: [...category.spots, newSpot()] })}>
            맛집 추가
          </button>
        </div>
        <div className="space-y-4">
          {category.spots.map((spot, index) => (
            <SpotEditor
              key={spot.id}
              spot={spot}
              locale={locale}
              onChange={(next) => onChange({ ...category, spots: category.spots.map((item, i) => (i === index ? next : item)) })}
              onMove={(direction) => {
                const to = index + direction;
                if (to < 0 || to >= category.spots.length) return;
                onChange({ ...category, spots: moveItem(category.spots, index, to) });
              }}
              onDelete={() => onChange({ ...category, spots: category.spots.filter((_, i) => i !== index) })}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SpotEditor({
  spot,
  locale,
  onChange,
  onMove,
  onDelete,
}: {
  spot: FoodCatalogSpot;
  locale: Locale;
  onChange: (spot: FoodCatalogSpot) => void;
  onMove: (direction: -1 | 1) => void;
  onDelete: () => void;
}) {
  return (
    <article className="rounded-lg border border-[#e2d9ca] bg-[#fffdf8] p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-medium">{spot.name.ko || spot.id}</h3>
        <div className="flex gap-2">
          <button className="rounded-md border border-[#bdb3a2] px-2 py-1 text-xs" type="button" onClick={() => onMove(-1)}>위</button>
          <button className="rounded-md border border-[#bdb3a2] px-2 py-1 text-xs" type="button" onClick={() => onMove(1)}>아래</button>
          <button className="rounded-md border border-[#bdb3a2] px-2 py-1 text-xs" type="button" onClick={onDelete}>삭제</button>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <TextField label="이름" value={spot.name[locale]} onChange={(value) => onChange({ ...spot, name: { ...spot.name, [locale]: value } })} />
        <TextField label="거리 라벨" value={spot.walk[locale]} onChange={(value) => onChange({ ...spot, walk: { ...spot.walk, [locale]: value } })} />
        <TextField label="지도 검색어" value={spot.mapQuery} onChange={(value) => onChange({ ...spot, mapQuery: value, id: spot.id || slugify(value) })} />
        <ImageField
          label="사진"
          value={spot.photoSrc ?? ''}
          folder="food"
          onChange={(value) => onChange({ ...spot, photoSrc: value || undefined })}
        />
        <TextField label="주소" value={spot.addr?.[locale] ?? ''} onChange={(value) => onChange({ ...spot, addr: { ...(spot.addr ?? emptyText), [locale]: value } })} />
        <TextField label="walk CSS class" value={spot.walkClass ?? ''} onChange={(value) => onChange({ ...spot, walkClass: value || undefined })} />
      </div>
      <TextArea label="설명 HTML" value={spot.descHtml[locale]} onChange={(value) => onChange({ ...spot, descHtml: { ...spot.descHtml, [locale]: value } })} />
      <label className="mt-3 flex items-center gap-2 text-sm">
        <input checked={spot.published} type="checkbox" onChange={(event) => onChange({ ...spot, published: event.target.checked })} />
        노출
      </label>
    </article>
  );
}

function TextField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      <input className="w-full rounded-md border border-[#d8d0c1] bg-white px-3 py-2 outline-none focus:border-[#2f4f46]" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function ImageField({
  label,
  value,
  folder,
  onChange,
}: {
  label: string;
  value: string;
  folder: string;
  onChange: (value: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    const { data } = await getSupabaseBrowser().auth.getSession();
    const token = data.session?.access_token;
    if (!token) return;

    setUploading(true);
    const form = new FormData();
    form.set('file', file);
    form.set('folder', folder);
    const res = await fetch('/api/admin/images', {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
      body: form,
    });
    const json = await res.json();
    setUploading(false);
    if (!res.ok) {
      window.alert(json.error ?? '업로드 실패');
      return;
    }
    onChange(json.url);
  }

  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      <div className="space-y-2">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt=""
            className="h-24 w-24 rounded-md border border-[#d8d0c1] object-cover"
          />
        ) : null}
        <input
          className="w-full rounded-md border border-[#d8d0c1] bg-white px-3 py-2 outline-none focus:border-[#2f4f46]"
          value={value}
          placeholder="/assets/food/... 또는 업로드 URL"
          onChange={(event) => onChange(event.target.value)}
        />
        <input
          accept="image/*"
          className="w-full text-xs"
          type="file"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void upload(file);
          }}
        />
        {uploading ? <p className="text-xs text-[#746c60]">업로드 중...</p> : null}
      </div>
    </label>
  );
}

function TextArea({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="mt-3 block text-sm">
      <span className="mb-1 block font-medium">{label}</span>
      <textarea className="min-h-24 w-full resize-y rounded-md border border-[#d8d0c1] bg-white px-3 py-2 leading-relaxed outline-none focus:border-[#2f4f46]" value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function newCategory(): FoodCatalogCategory {
  const id = `category-${Date.now()}`;
  return { id, title: { ...emptyText }, published: true, spots: [] };
}

function newSpot(): FoodCatalogSpot {
  const id = `spot-${Date.now()}`;
  return {
    id,
    mapQuery: '',
    name: { ...emptyText },
    walk: { ko: '도보 분', en: 'min walk', zh: '步行 分钟' },
    descHtml: { ...emptyText },
    published: true,
  };
}

function moveItem<T>(items: T[], from: number, to: number) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  if (item === undefined) return items;
  next.splice(to, 0, item);
  return next;
}

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9가-힣]+/g, '-')
      .replace(/^-+|-+$/g, '') || `item-${Date.now()}`
  );
}

function AdminShell({ children, message }: { children?: React.ReactNode; message?: string }) {
  return (
    <div className="min-h-screen bg-[#f7f3ea] font-sans text-[#29251f]">
      {children}
      {message ? (
        <div className="fixed bottom-4 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-full border border-[#d8d0c1] bg-white px-4 py-2 text-sm shadow-lg">
          {message}
        </div>
      ) : null}
    </div>
  );
}
