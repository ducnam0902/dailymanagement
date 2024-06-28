import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';


const notoSans = Noto_Sans({ subsets: ['latin'] });

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
      <body className={notoSans.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
