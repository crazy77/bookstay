'use client';

import { contentValue, type ContentMap } from '@/data/site-content';
import { INSTAGRAM_DM_URL } from '@/lib/site';
import { ThemePicker } from '@/components/ui/ThemePicker';

function FootMetaBlock({ lang, content }: { lang: 'ko' | 'en' | 'zh'; content: ContentMap }) {
  const dmPrompt = contentValue<string>(content, 'guide.footerDmPrompt');
  const checkinLabel = contentValue<string>(content, 'guide.footerCheckinLabel');
  const checkin = contentValue<string>(content, 'guide.footerCheckin');
  const checkoutLabel = contentValue<string>(content, 'guide.footerCheckoutLabel');
  const checkout = contentValue<string>(content, 'guide.footerCheckout');

  return (
    <p lang={lang}>
      {dmPrompt[lang]}
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
      {checkinLabel[lang]} · <em>{checkin[lang]}</em>
      {' · '}
      {checkoutLabel[lang]} · <em>{checkout[lang]}</em>
    </p>
  );
}

export function GuideFooter({ content }: { content: ContentMap }) {
  return (
    <footer className="site-foot">
      <div className="foot-inner">
        <div className="foot-brand">
          <span className="brand-ko">해묘서가</span>
          <span className="brand-en">BOOKSTAY · HALLIM, JEJU</span>
        </div>
        <div className="foot-meta toggle">
          <FootMetaBlock lang="ko" content={content} />
          <FootMetaBlock lang="en" content={content} />
          <FootMetaBlock lang="zh" content={content} />
        </div>
        <div className="foot-theme">
          <ThemePicker />
        </div>
      </div>
    </footer>
  );
}
