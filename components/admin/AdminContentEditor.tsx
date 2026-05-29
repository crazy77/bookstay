'use client';

import { useEffect, useMemo, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import LinkExtension from '@tiptap/extension-link';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { AdminHeader, AdminMenuButton } from '@/components/admin/AdminHeader';
import type { ContentInputType, ImageListItem } from '@/data/site-content';
import { getSupabaseBrowser } from '@/lib/supabase';

type Locale = 'ko' | 'en' | 'zh';
type DraftValue = string | string[] | ImageListItem[];
type Drafts = Record<string, Record<Locale, DraftValue>>;

type EntryRow = {
  key: string;
  category: string;
  label: string;
  input_type: ContentInputType;
  locale_values: Record<Locale, unknown>;
  updated_at?: string;
};

const LOCALES: Array<{ key: Locale; label: string }> = [
  { key: 'ko', label: '한국어' },
  { key: 'en', label: 'English' },
  { key: 'zh', label: '中文' },
];

const CATEGORY_LABELS: Record<string, string> = {
  home: '홈',
  guide: '가이드',
};

function normalizeDraft(type: ContentInputType, value: unknown): DraftValue {
  if (type === 'image_list') return normalizeImageList(value);
  if (type === 'list') {
    return Array.isArray(value) ? value.map((line) => String(line ?? '')) : [];
  }
  if (type === 'rich_list') return normalizeRichHtmlLines(value);
  return String(value ?? '');
}

function normalizeImageList(value: unknown): ImageListItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return { src: '', caption: '' };
      const data = item as Partial<ImageListItem>;
      return {
        src: String(data.src ?? ''),
        caption: String(data.caption ?? ''),
      };
    })
    .filter((item) => item.src || item.caption);
}

function normalizeRichHtmlLines(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((line) => {
    if (typeof line === 'string') return line;
    if (!Array.isArray(line)) return escapeHtml(String(line ?? ''));
    return line.map((segment) => segmentToHtml(segment)).join('');
  });
}

function cleanValue(type: ContentInputType, value: DraftValue) {
  if (type === 'image_list') {
    return Array.isArray(value)
      ? value
          .map((item) => {
            if (!item || typeof item !== 'object' || Array.isArray(item)) {
              return { src: '', caption: '' };
            }
            return {
              src: String((item as ImageListItem).src ?? '').trim(),
              caption: String((item as ImageListItem).caption ?? '').trim(),
            };
          })
          .filter((item) => item.src)
      : [];
  }
  if (type === 'list') {
    return Array.isArray(value)
      ? value.map((line) => String(line).trim()).filter(Boolean)
      : [];
  }
  if (type === 'rich_list') {
    return Array.isArray(value)
      ? value.map((line) => String(line).trim()).filter((line) => line && line !== '<p></p>')
      : [];
  }
  return String(value ?? '');
}

function makeDrafts(entries: EntryRow[]): Drafts {
  return Object.fromEntries(
    entries.map((entry) => [
      entry.key,
      Object.fromEntries(
        LOCALES.map(({ key }) => [
          key,
          normalizeDraft(entry.input_type, entry.locale_values[key]),
        ]),
      ),
    ]),
  ) as Drafts;
}

function fingerprint(value: unknown) {
  return JSON.stringify(value);
}

function isDirty(entry: EntryRow, drafts: Drafts, originals: Drafts) {
  return fingerprint(drafts[entry.key]) !== fingerprint(originals[entry.key]);
}

export function AdminContentEditor() {
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [entries, setEntries] = useState<EntryRow[]>([]);
  const [drafts, setDrafts] = useState<Drafts>({});
  const [originals, setOriginals] = useState<Drafts>({});
  const [activeLocale, setActiveLocale] = useState<Locale>('ko');
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [savingKeys, setSavingKeys] = useState<Set<string>>(new Set());

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
    void loadEntries(session.access_token);
  }, [session]);

  const categories = useMemo(
    () => ['all', ...Array.from(new Set(entries.map((entry) => entry.category)))],
    [entries],
  );

  const filteredEntries = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return entries.filter((entry) => {
      const matchesCategory = activeCategory === 'all' || entry.category === activeCategory;
      const matchesQuery =
        !needle ||
        entry.key.toLowerCase().includes(needle) ||
        entry.label.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, entries, query]);

  const dirtyEntries = entries.filter((entry) => isDirty(entry, drafts, originals));
  const isSaving = savingKeys.size > 0;

  useEffect(() => {
    if (dirtyEntries.length === 0) return;
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => window.removeEventListener('beforeunload', onBeforeUnload);
  }, [dirtyEntries.length]);

  async function loadEntries(token: string) {
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/admin/content', {
      headers: { authorization: `Bearer ${token}` },
    });
    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      setMessage(`불러오기 실패: ${json.error ?? res.statusText}`);
      return;
    }

    const nextEntries = json.entries as EntryRow[];
    const nextDrafts = makeDrafts(nextEntries);
    setEntries(nextEntries);
    setDrafts(nextDrafts);
    setOriginals(nextDrafts);
  }

  async function signIn() {
    if (!supabase) return;
    setMessage('');
    setLoading(true);

    const result = password
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: `${window.location.origin}/admin/content` },
        });

    setLoading(false);
    if (result.error) {
      setMessage(result.error.message);
      return;
    }
    setMessage(password ? '로그인했습니다.' : '메일로 로그인 링크를 보냈습니다.');
  }

  async function signOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
    setEntries([]);
    setDrafts({});
    setOriginals({});
  }

  async function saveEntries(targetEntries: EntryRow[]) {
    if (!session || !targetEntries.length) return;

    setSavingKeys((prev) => new Set([...prev, ...targetEntries.map((entry) => entry.key)]));
    setMessage('');

    try {
      const payload = targetEntries.map((entry) => ({
        key: entry.key,
        locale_values: Object.fromEntries(
          LOCALES.map(({ key }) => [
            key,
            cleanValue(entry.input_type, drafts[entry.key]?.[key] ?? ''),
          ]),
        ),
      }));

      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${session.access_token}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({ entries: payload }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? res.statusText);
      setMessage(
        targetEntries.length === 1
          ? `${targetEntries[0].label} 저장 완료`
          : `${targetEntries.length}개 항목 저장 완료`,
      );
      await loadEntries(session.access_token);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '저장에 실패했습니다.');
    } finally {
      setSavingKeys((prev) => {
        const next = new Set(prev);
        targetEntries.forEach((entry) => next.delete(entry.key));
        return next;
      });
    }
  }

  async function seedDefaults() {
    if (!session) return;
    setSavingKeys(new Set(['__seed__']));
    setMessage('');
    const res = await fetch('/api/admin/content', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${session.access_token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({ seedDefaults: true }),
    });
    const json = await res.json();
    setSavingKeys(new Set());
    if (!res.ok) {
      setMessage(`기본값 저장 실패: ${json.error ?? res.statusText}`);
      return;
    }
    setMessage('기본 콘텐츠를 DB에 저장했습니다.');
    await loadEntries(session.access_token);
  }

  function updateDraft(entryKey: string, locale: Locale, value: DraftValue) {
    setDrafts((prev) => ({
      ...prev,
      [entryKey]: { ...prev[entryKey], [locale]: value },
    }));
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
            <h1 className="mb-6 text-xl font-semibold">콘텐츠 관리자</h1>
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
        title="콘텐츠 관리"
        status={`변경 ${dirtyEntries.length}개 · ${session.user.email}`}
        active="content"
        primaryLabel={`저장 ${dirtyEntries.length}`}
        primaryDisabled={isSaving || dirtyEntries.length === 0}
        onPrimary={() => saveEntries(dirtyEntries)}
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
            <AdminMenuButton
              onClick={() => {
                setDrafts(originals);
                setMessage('변경 사항을 취소했습니다.');
              }}
              disabled={isSaving || dirtyEntries.length === 0}
            >
              변경 취소
            </AdminMenuButton>
            <AdminMenuButton onClick={signOut}>로그아웃</AdminMenuButton>
          </>
        }
      >
        <div className="grid grid-cols-[5.6rem_5.8rem_minmax(0,1fr)] gap-2 md:grid-cols-[5.6rem_10rem_minmax(12rem,18rem)] md:items-center">
          <div className="flex min-w-0 rounded-md border border-[#bdb3a2] bg-[#f7f3ea] p-0.5">
            {LOCALES.map(({ key, label }) => (
                  <button
                    key={key}
                aria-label={label}
                title={label}
                className={`h-8 min-w-0 flex-1 rounded px-1 text-sm ${
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
            onChange={(event) => setActiveCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? '전체' : CATEGORY_LABELS[category] ?? category}
              </option>
            ))}
          </select>

          <label className="block min-w-0">
            <span className="sr-only">검색</span>
            <input
              className="h-9 w-full rounded-md border border-[#d8d0c1] px-3 text-sm outline-none focus:border-[#2f4f46]"
              value={query}
              placeholder="검색"
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
            </div>
      </AdminHeader>

      <main className="mx-auto max-w-7xl px-5 py-6">
          <div className="space-y-4">
            {filteredEntries.map((entry) => (
              <EntryEditor
                key={entry.key}
                entry={entry}
                locale={activeLocale}
                dirty={isDirty(entry, drafts, originals)}
                saving={savingKeys.has(entry.key)}
                value={drafts[entry.key]?.[activeLocale] ?? ''}
                onChange={(value) => updateDraft(entry.key, activeLocale, value)}
                onSave={() => saveEntries([entry])}
              />
            ))}
          </div>
      </main>
    </AdminShell>
  );
}

function EntryEditor({
  entry,
  locale,
  dirty,
  saving,
  value,
  onChange,
  onSave,
}: {
  entry: EntryRow;
  locale: Locale;
  dirty: boolean;
  saving: boolean;
  value: DraftValue;
  onChange: (value: DraftValue) => void;
  onSave: () => void;
}) {
  const updatedAt = entry.updated_at ? formatCompactDate(entry.updated_at) : '';
  const saveButton = (
    <button
      className="h-10 shrink-0 rounded-md border border-[#bdb3a2] px-3 text-xs disabled:opacity-50"
      type="button"
      onClick={onSave}
      disabled={!dirty || saving}
    >
      {saving ? '저장 중' : '저장'}
    </button>
  );

  return (
    <section className="rounded-lg border border-[#d8d0c1] bg-white p-3 shadow-sm">
      <div className="mb-2 min-w-0" title={entry.key}>
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1">
          <h2 className="truncate font-semibold">{entry.label}</h2>
          <span className="rounded bg-[#f1eadf] px-1.5 py-0.5 text-[0.68rem] uppercase text-[#746c60]">
            {CATEGORY_LABELS[entry.category] ?? entry.category} · {entry.input_type}
          </span>
          {dirty ? (
            <span className="rounded bg-[#e9d7a8] px-1.5 py-0.5 text-[0.68rem] text-[#4f3e12]">
              변경됨
            </span>
          ) : null}
          {updatedAt ? (
            <span className="min-w-0 truncate font-mono text-[0.7rem] text-[#746c60]">
              {updatedAt}
            </span>
          ) : null}
        </div>
      </div>

      <ValueEditor
        type={entry.input_type}
        locale={locale}
        value={value}
        saveControl={saveButton}
        onChange={onChange}
      />
    </section>
  );
}

function formatCompactDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  const yy = String(date.getFullYear()).slice(-2);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${yy}.${month}.${day} ${hours}:${minutes}:${seconds}`;
}

function ValueEditor({
  type,
  locale,
  value,
  saveControl,
  onChange,
}: {
  type: ContentInputType;
  locale: Locale;
  value: DraftValue;
  saveControl: React.ReactNode;
  onChange: (value: DraftValue) => void;
}) {
  if (type === 'text') {
    return (
      <div className="flex gap-2">
        <input
          className="h-10 min-w-0 flex-1 rounded-md border border-[#d8d0c1] bg-[#fffdf8] px-3 text-sm outline-none focus:border-[#2f4f46]"
          lang={locale}
          value={typeof value === 'string' ? value : ''}
          onChange={(event) => onChange(event.target.value)}
        />
        {saveControl}
      </div>
    );
  }

  if (type === 'textarea') {
    return (
      <div className="space-y-2">
        <textarea
          className="min-h-20 w-full resize-y rounded-md border border-[#d8d0c1] bg-[#fffdf8] px-3 py-2 text-sm leading-relaxed outline-none focus:border-[#2f4f46]"
          lang={locale}
          value={typeof value === 'string' ? value : ''}
          onChange={(event) => onChange(event.target.value)}
        />
        <div className="flex justify-end">{saveControl}</div>
      </div>
    );
  }

  if (type === 'image') {
    return (
      <ImageValueEditor
        value={typeof value === 'string' ? value : ''}
        saveControl={saveControl}
        onChange={onChange}
      />
    );
  }

  if (type === 'image_list') {
    return (
      <ImageListEditor
        value={Array.isArray(value) ? normalizeImageList(value) : []}
        saveControl={saveControl}
        onChange={onChange}
      />
    );
  }

  if (type === 'list') {
    return (
      <ListEditor
        value={Array.isArray(value) ? (value as string[]) : []}
        saveControl={saveControl}
        onChange={onChange}
      />
    );
  }

  return (
    <RichListEditor
      value={Array.isArray(value) ? (value as string[]) : []}
      saveControl={saveControl}
      onChange={onChange}
    />
  );
}

async function uploadAdminImage(file: File, folder: string) {
  const { data } = await getSupabaseBrowser().auth.getSession();
  const token = data.session?.access_token;
  if (!token) return '';

  const form = new FormData();
  form.set('file', file);
  form.set('folder', folder);
  const res = await fetch('/api/admin/images', {
    method: 'POST',
    headers: { authorization: `Bearer ${token}` },
    body: form,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? '업로드 실패');
  return String(json.url ?? '');
}

function ImageValueEditor({
  value,
  saveControl,
  onChange,
}: {
  value: string;
  saveControl: React.ReactNode;
  onChange: (value: string) => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    try {
      const url = await uploadAdminImage(file, 'home');
      if (url) onChange(url);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : '업로드 실패');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-2 sm:grid-cols-[6rem_minmax(0,1fr)_auto]">
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="h-24 w-full rounded-md border border-[#d8d0c1] object-cover sm:w-24"
        />
      ) : (
        <div className="hidden h-24 rounded-md border border-dashed border-[#d8d0c1] sm:block" />
      )}
      <div className="min-w-0 space-y-2">
        <input
          className="h-10 w-full rounded-md border border-[#d8d0c1] bg-[#fffdf8] px-3 text-sm outline-none focus:border-[#2f4f46]"
          value={value}
          placeholder="/assets/hero.png 또는 업로드 URL"
          onChange={(event) => onChange(event.target.value)}
        />
        <label
          className={`inline-flex h-9 w-fit cursor-pointer items-center rounded-md border border-[#bdb3a2] bg-white px-3 text-xs font-medium ${
            uploading ? 'pointer-events-none opacity-60' : ''
          }`}
        >
          {uploading ? '업로드 중' : '이미지 업로드'}
          <input
            accept="image/*"
            className="sr-only"
            disabled={uploading}
            type="file"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void upload(file);
              event.currentTarget.value = '';
            }}
          />
        </label>
        {uploading ? <p className="text-xs text-[#746c60]">업로드 중...</p> : null}
      </div>
      <div className="flex justify-end sm:block">{saveControl}</div>
    </div>
  );
}

function ImageListEditor({
  value,
  saveControl,
  onChange,
}: {
  value: ImageListItem[];
  saveControl: React.ReactNode;
  onChange: (value: ImageListItem[]) => void;
}) {
  const slides = value.length ? value : [{ src: '', caption: '' }];

  function updateSlide(index: number, patch: Partial<ImageListItem>) {
    onChange(slides.map((slide, i) => (i === index ? { ...slide, ...patch } : slide)));
  }

  return (
    <div className="space-y-2">
      {slides.map((slide, index) => (
        <ImageListItemEditor
          key={index}
          index={index}
          slide={slide}
          canDelete={slides.length > 1}
          canMoveUp={index > 0}
          canMoveDown={index < slides.length - 1}
          onChange={(patch) => updateSlide(index, patch)}
          onMove={(to) => onChange(moveItem(slides, index, to))}
          onDelete={() => onChange(slides.filter((_, i) => i !== index))}
        />
      ))}
      <div className="flex items-center justify-between gap-2">
        <button
          className="h-10 rounded-md border border-[#bdb3a2] px-3 text-xs"
          type="button"
          onClick={() => onChange([...slides, { src: '', caption: '' }])}
        >
          사진 추가
        </button>
        {saveControl}
      </div>
    </div>
  );
}

function ImageListItemEditor({
  index,
  slide,
  canDelete,
  canMoveUp,
  canMoveDown,
  onChange,
  onMove,
  onDelete,
}: {
  index: number;
  slide: ImageListItem;
  canDelete: boolean;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onChange: (patch: Partial<ImageListItem>) => void;
  onMove: (to: number) => void;
  onDelete: () => void;
}) {
  const [uploading, setUploading] = useState(false);

  async function upload(file: File) {
    setUploading(true);
    try {
      const url = await uploadAdminImage(file, 'home');
      if (url) onChange({ src: url });
    } catch (error) {
      window.alert(error instanceof Error ? error.message : '업로드 실패');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="rounded-md border border-[#e2d9ca] bg-[#fffdf8] p-2">
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-xs font-medium text-[#746c60]">사진 {index + 1}</p>
        <div className="flex gap-1">
          <button
            className="rounded-md border border-[#bdb3a2] px-2 py-1 text-xs disabled:opacity-40"
            type="button"
            disabled={!canMoveUp}
            onClick={() => onMove(index - 1)}
          >
            위
          </button>
          <button
            className="rounded-md border border-[#bdb3a2] px-2 py-1 text-xs disabled:opacity-40"
            type="button"
            disabled={!canMoveDown}
            onClick={() => onMove(index + 1)}
          >
            아래
          </button>
          <button
            className="rounded-md border border-[#bdb3a2] px-2 py-1 text-xs disabled:opacity-40"
            type="button"
            disabled={!canDelete}
            onClick={onDelete}
          >
            삭제
          </button>
        </div>
      </div>
      <div className="grid gap-2 sm:grid-cols-[6rem_minmax(0,1fr)]">
        {slide.src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={slide.src}
            alt=""
            className="h-24 w-full rounded-md border border-[#d8d0c1] object-cover sm:w-24"
          />
        ) : (
          <div className="hidden h-24 rounded-md border border-dashed border-[#d8d0c1] sm:block" />
        )}
        <div className="min-w-0 space-y-2">
          <input
            className="h-10 w-full rounded-md border border-[#d8d0c1] bg-white px-3 text-sm outline-none focus:border-[#2f4f46]"
            value={slide.src}
            placeholder="/assets/hero.png 또는 업로드 URL"
            onChange={(event) => onChange({ src: event.target.value })}
          />
          <div className="flex flex-wrap gap-2">
            <input
              className="h-9 min-w-0 flex-1 rounded-md border border-[#d8d0c1] bg-white px-3 text-sm outline-none focus:border-[#2f4f46]"
              value={slide.caption}
              placeholder="캡션"
              onChange={(event) => onChange({ caption: event.target.value })}
            />
            <label
              className={`inline-flex h-9 w-fit cursor-pointer items-center rounded-md border border-[#bdb3a2] bg-white px-3 text-xs font-medium ${
                uploading ? 'pointer-events-none opacity-60' : ''
              }`}
            >
              {uploading ? '업로드 중' : '이미지 업로드'}
              <input
                accept="image/*"
                className="sr-only"
                disabled={uploading}
                type="file"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) void upload(file);
                  event.currentTarget.value = '';
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

function ListEditor({
  value,
  saveControl,
  onChange,
}: {
  value: string[];
  saveControl: React.ReactNode;
  onChange: (value: string[]) => void;
}) {
  const lines = value.length ? value : [''];

  function updateLine(index: number, line: string) {
    onChange(lines.map((item, i) => (i === index ? line : item)));
  }

  return (
    <div className="space-y-1.5">
      {lines.map((line, index) => (
        <div key={index} className="flex gap-2">
          <input
            className="h-10 min-w-0 flex-1 rounded-md border border-[#d8d0c1] bg-[#fffdf8] px-3 text-sm outline-none focus:border-[#2f4f46]"
            value={line}
            onChange={(event) => updateLine(index, event.target.value)}
          />
          <button
            className="rounded-md border border-[#bdb3a2] px-2 text-xs disabled:opacity-40"
            type="button"
            disabled={lines.length === 1}
            onClick={() => onChange(lines.filter((_, i) => i !== index))}
          >
            삭제
          </button>
        </div>
      ))}
      <div className="flex items-center justify-between gap-2">
        <button
          className="h-10 rounded-md border border-[#bdb3a2] px-3 text-xs"
          type="button"
          onClick={() => onChange([...lines, ''])}
        >
          줄 추가
        </button>
        {saveControl}
      </div>
    </div>
  );
}

function RichListEditor({
  value,
  saveControl,
  onChange,
}: {
  value: string[];
  saveControl: React.ReactNode;
  onChange: (value: string[]) => void;
}) {
  const lines = value.length ? value : [''];

  function updateLine(lineIndex: number, line: string) {
    onChange(lines.map((item, i) => (i === lineIndex ? line : item)));
  }

  return (
    <div className="space-y-2">
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="rounded-md border border-[#e2d9ca] bg-[#fffdf8] p-2.5">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="text-xs font-medium text-[#746c60]">문장 {lineIndex + 1}</p>
            <div className="flex gap-1">
              <button
                className="rounded-md border border-[#bdb3a2] px-2 py-1 text-xs disabled:opacity-40"
                type="button"
                disabled={lineIndex === 0}
                onClick={() => onChange(moveItem(lines, lineIndex, lineIndex - 1))}
              >
                위
              </button>
              <button
                className="rounded-md border border-[#bdb3a2] px-2 py-1 text-xs disabled:opacity-40"
                type="button"
                disabled={lineIndex === lines.length - 1}
                onClick={() => onChange(moveItem(lines, lineIndex, lineIndex + 1))}
              >
                아래
              </button>
              <button
                className="rounded-md border border-[#bdb3a2] px-2 py-1 text-xs disabled:opacity-40"
                type="button"
                disabled={lines.length === 1}
                onClick={() => onChange(lines.filter((_, i) => i !== lineIndex))}
              >
                삭제
              </button>
            </div>
          </div>

          <RichTextEditor value={line} onChange={(html) => updateLine(lineIndex, html)} />
        </div>
      ))}

      <div className="flex items-center justify-between gap-2">
        <button
          className="h-10 rounded-md border border-[#bdb3a2] px-3 text-xs"
          type="button"
          onClick={() => onChange([...lines, ''])}
        >
          문장 추가
        </button>
        {saveControl}
      </div>
    </div>
  );
}

function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        blockquote: false,
        bulletList: false,
        orderedList: false,
        listItem: false,
        horizontalRule: false,
        codeBlock: false,
      }),
      LinkExtension.configure({
        openOnClick: false,
        autolink: false,
        defaultProtocol: 'https',
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank',
        },
      }),
    ],
    content: value || '',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          'min-h-24 rounded-md border border-[#d8d0c1] bg-white px-3 py-2 text-sm leading-relaxed outline-none focus:border-[#2f4f46]',
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== (value || '<p></p>')) {
      editor.commands.setContent(value || '', { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) return null;

  const activeEditor = editor;
  const currentHref = activeEditor.getAttributes('link').href as string | undefined;

  function setLink() {
    const href = window.prompt('링크 URL', currentHref ?? '');
    if (href === null) return;
    if (!href.trim()) {
      activeEditor.chain().focus().unsetLink().run();
      return;
    }
    activeEditor.chain().focus().extendMarkRange('link').setLink({ href: href.trim() }).run();
  }

  return (
    <div>
      <div className="mb-2 flex flex-wrap gap-1">
        <ToolbarButton
          active={activeEditor.isActive('bold')}
          label="B"
          onClick={() => activeEditor.chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          active={activeEditor.isActive('italic')}
          label="I"
          onClick={() => activeEditor.chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          active={activeEditor.isActive('code')}
          label="Code"
          onClick={() => activeEditor.chain().focus().toggleCode().run()}
        />
        <ToolbarButton active={activeEditor.isActive('link')} label="Link" onClick={setLink} />
        <ToolbarButton
          active={false}
          label="Unlink"
          onClick={() => activeEditor.chain().focus().unsetLink().run()}
        />
      </div>
      <EditorContent editor={activeEditor} />
    </div>
  );
}

function ToolbarButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`min-h-8 rounded-md border px-2.5 text-xs font-medium ${
        active ? 'border-[#2f4f46] bg-[#2f4f46] text-white' : 'border-[#bdb3a2] bg-white'
      }`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

function moveItem<T>(items: T[], from: number, to: number) {
  const next = [...items];
  const [item] = next.splice(from, 1);
  if (item === undefined) return items;
  next.splice(to, 0, item);
  return next;
}

function segmentToHtml(segment: unknown) {
  if (typeof segment === 'string') return escapeHtml(segment);
  if (!segment || typeof segment !== 'object') return '';

  const data = segment as {
    text?: string;
    strong?: boolean;
    code?: boolean;
    href?: string;
    external?: boolean;
  };
  let content = escapeHtml(String(data.text ?? ''));
  if (data.code) content = `<code>${content}</code>`;
  if (data.strong) content = `<strong>${content}</strong>`;
  if (data.href) {
    const href = escapeHtml(data.href);
    const attrs =
      data.external || data.href.startsWith('http')
        ? ` href="${href}" target="_blank" rel="noopener noreferrer"`
        : ` href="${href}"`;
    content = `<a${attrs}>${content}</a>`;
  }
  return content;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function AdminShell({
  children,
  message,
}: {
  children?: React.ReactNode;
  message?: string;
}) {
  return (
    <div>
      {children}
      {message ? (
        <div className="fixed bottom-4 left-1/2 z-50 max-w-[calc(100vw-2rem)] -translate-x-1/2 rounded-full border border-[#d8d0c1] bg-white px-4 py-2 text-sm shadow-lg">
          {message}
        </div>
      ) : null}
    </div>
  );
}
