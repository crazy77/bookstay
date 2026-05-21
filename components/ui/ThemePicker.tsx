'use client';

import { isThemeId, THEMES } from '@/lib/themes';
import { useTheme } from '@/providers/ThemeProvider';

/** 임시 — 팔레트 결정 후 제거 */
export function ThemePicker() {
  const { themeId, setThemeId } = useTheme();

  return (
    <label className="theme-picker">
      <span className="theme-picker-label">색</span>
      <select
        className="theme-picker-select"
        value={themeId}
        aria-label="배경·테두리 색 미리보기"
        onChange={(e) => {
          const next = e.target.value;
          if (isThemeId(next)) setThemeId(next);
        }}
      >
        {THEMES.map(({ id, label }) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}
