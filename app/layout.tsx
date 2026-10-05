import type { Metadata } from 'next';
import './globals.css';
import { LibraryProvider } from '@/context/LibraryContext';
import { AppShell } from '@/components/AppShell';

export const metadata: Metadata = {
  title: 'Aim 1 Literature Library | PhD Research Map',
  description: 'Foresight, financial consequences and labour-market decision-making in unpaid care. A visual research library and intellectual map for doctoral research.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-GB">
      <body className="bg-[#FAF8F5] text-[#1C1917] min-h-screen">
        <LibraryProvider>
          <AppShell>
            {children}
          </AppShell>
        </LibraryProvider>
      </body>
    </html>
  );
}
