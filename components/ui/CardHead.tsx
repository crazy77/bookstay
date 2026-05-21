import { ToggleText } from '@/components/ui/ToggleText';
import type { LocaleText } from '@/lib/locale';

export function CardHead({ title }: { title: LocaleText }) {
  return (
    <header className="card-head">
      <ToggleText
        as="h2"
        className="card-head__title"
        ko={title.ko}
        en={title.en}
        zh={title.zh}
      />
    </header>
  );
}

export function BlockHead({ title }: { title: LocaleText }) {
  return (
    <ToggleText
      as="h3"
      className="block-head"
      ko={title.ko}
      en={title.en}
      zh={title.zh}
    />
  );
}
