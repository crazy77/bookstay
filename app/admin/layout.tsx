export const metadata = {
  title: 'Admin · 해묘서가',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f7f3ea] font-sans text-[#29251f]">{children}</div>;
}
