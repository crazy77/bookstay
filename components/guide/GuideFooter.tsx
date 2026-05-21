import { FOOTER_META } from '@/data/guide-i18n';
import { INSTAGRAM_DM_URL } from '@/lib/site';
import { Seagull } from '@/components/ui/Seagull';

export function GuideFooter() {
  return (
    <footer className="site-foot">
      <div className="foot-inner">
        <div className="foot-brand">
          <span className="brand-ko">해묘서가</span>
          <span className="brand-en">BOOKSTAY · HALLIM, JEJU</span>
        </div>
        <div className="foot-meta toggle">
          <p lang="ko">
            {FOOTER_META.contact.ko} ·{' '}
            <a
              className="contact-link"
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              @bookstay_haemyo DM
            </a>
            <br />
            {FOOTER_META.checkoutLabel.ko} · <em>{FOOTER_META.checkout.ko}</em>
            <br />
            {FOOTER_META.line2.ko}
          </p>
          <p lang="en">
            {FOOTER_META.contact.en} ·{' '}
            <a
              className="contact-link"
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              @bookstay_haemyo DM
            </a>
            <br />
            {FOOTER_META.checkoutLabel.en} · <em>{FOOTER_META.checkout.en}</em>
            <br />
            {FOOTER_META.line2.en}
          </p>
          <p lang="zh">
            {FOOTER_META.contact.zh} ·{' '}
            <a
              className="contact-link"
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              @bookstay_haemyo DM
            </a>
            <br />
            {FOOTER_META.checkoutLabel.zh} · <em>{FOOTER_META.checkout.zh}</em>
            <br />
            {FOOTER_META.line2.zh}
          </p>
        </div>
        <Seagull />
      </div>
    </footer>
  );
}
