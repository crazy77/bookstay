'use client';

import { FOOTER_META } from '@/data/guide-i18n';
import { INSTAGRAM_DM_URL } from '@/lib/site';
import { ThemePicker } from '@/components/ui/ThemePicker';

function FootMetaBlock({ lang }: { lang: 'ko' | 'en' | 'zh' }) {
  return (
    <p lang={lang}>
      {FOOTER_META.dmPrompt[lang]}
      <br />
      <a
        className="contact-link"
        href={INSTAGRAM_DM_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        @bookstay_haemyo DM
      </a>
      <br />
      {FOOTER_META.checkinLabel[lang]} · <em>{FOOTER_META.checkin[lang]}</em>
      {' · '}
      {FOOTER_META.checkoutLabel[lang]} · <em>{FOOTER_META.checkout[lang]}</em>
    </p>
  );
}

export function GuideFooter() {
  return (
    <footer className="site-foot">
      <div className="foot-inner">
        <div className="foot-brand">
          <span className="brand-ko">해묘서가</span>
          <span className="brand-en">BOOKSTAY · HALLIM, JEJU</span>
        </div>
        <div className="foot-meta toggle">
          <FootMetaBlock lang="ko" />
          <FootMetaBlock lang="en" />
          <FootMetaBlock lang="zh" />
        </div>
        <div className="foot-theme">
          <ThemePicker />
        </div>
      </div>
    </footer>
  );
}
