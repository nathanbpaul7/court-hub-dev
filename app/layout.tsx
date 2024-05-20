import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Court Hub DEMO',
    default: 'Court Hub DEMO',
  },
  viewport:
    'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  description:
    'The official Court Hub dashboard built with Next.js App Router.',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
