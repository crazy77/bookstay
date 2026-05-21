'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type Lang = 'ko' | 'en' | 'zh';

const STORAGE_KEY = 'haemyo.lang';

const CYCLE: Lang[] = ['ko', 'en', 'zh'];

const LangContext = createContext<{
  lang: Lang;
  toggle: () => void;
} | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'ko' || saved === 'en' || saved === 'zh') setLang(saved);
  }, []);

  useEffect(() => {
    const htmlLang = lang === 'zh' ? 'zh-Hans' : lang;
    document.documentElement.lang = htmlLang;
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    setLang((prev) => {
      const i = CYCLE.indexOf(prev);
      const next = CYCLE[(i + 1) % CYCLE.length] ?? 'ko';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  }, []);

  return (
    <LangContext.Provider value={{ lang, toggle }}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
