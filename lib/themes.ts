/** 임시 테마 미리보기 — 결정 후 ThemePicker·오버라이드 제거 */
export const THEME_STORAGE_KEY = 'haemyo.theme';

export const THEMES = [
  { id: 'cream', label: '크림' },
  { id: 'white', label: '화이트' },
  { id: 'cool', label: '시원' },
  { id: 'red', label: '레드' },
  { id: 'violet', label: '바이올렛' },
  { id: 'wood', label: '다크우드' },
] as const;

export type ThemeId = (typeof THEMES)[number]['id'];

export const DEFAULT_THEME_ID: ThemeId = 'cream';

export function isThemeId(value: string): value is ThemeId {
  return THEMES.some((t) => t.id === value);
}
