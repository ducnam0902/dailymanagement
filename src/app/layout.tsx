import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import AppProvider from '@/AppProvider'
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import LoadingScreen from '@/components/LoadingScreen';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <AppProvider>
          <ToastContainer />
          {children}
        <LoadingScreen/>
        </AppProvider>
      </body>
    </html>
  );
}
