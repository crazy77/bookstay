import { LangProvider } from '@/providers/LangProvider';

export default function GuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LangProvider>{children}</LangProvider>;
}
