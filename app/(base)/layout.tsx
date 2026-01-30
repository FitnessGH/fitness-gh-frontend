import { Footer } from '@/components/layout/footer';
import { PublicHeader } from '@/components/layout/public-header';

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <PublicHeader />
      {children}
      <Footer />
    </div>
  );
}
