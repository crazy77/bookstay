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
            문의 ·{' '}
            <a
              className="contact-link"
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              @bookstay_haemyo DM
            </a>
            <br />
            체크아웃 · <em>오전 11시까지</em>
            <br />
            궁금한 점은 인스타그램 메시지로 보내 주세요.
          </p>
          <p lang="en">
            Contact ·{' '}
            <a
              className="contact-link"
              href={INSTAGRAM_DM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              @bookstay_haemyo DM
            </a>
            <br />
            Check-out · <em>11:00 AM</em>
            <br />
            Please message us on Instagram anytime.
          </p>
        </div>
        <Seagull />
      </div>
    </footer>
  );
}
