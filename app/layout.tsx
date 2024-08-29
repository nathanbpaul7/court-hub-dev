import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Court Hub',
    default: 'Court Hub',
  },

  description:
    'The official Court Hub web app developed by Nathan Paul, a way for tennis communities to thrive',
  metadataBase: new URL('https://court-hub-demo.vercel.app/'),
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
