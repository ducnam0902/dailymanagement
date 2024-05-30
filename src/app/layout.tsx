import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const cormorantGaramond = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Daily management',
  description: 'Manage daily task, expenses',
  icons: {
    icon: '/smallLogo.png'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cormorantGaramond.className}>{children}</body>
    </html>
  );
}
