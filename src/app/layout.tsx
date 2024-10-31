import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import AppProvider from '@/AppProvider'
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';
import LoadingScreen from '@/components/LoadingScreen';
import envConfig from '@/utils/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: ' %s | Daily Management',
    default: 'Daily Management'
  },
  description: 'Daily Management helps you managing tasks, expenses and get out of some troubles need to done today',
  icons: {
    icon: '/logo.png'
  },
  keywords: ['Daily management', 'Tasks', 'Expenses', 'Daily', 'Manage', 'Management', 'Schedules'],
  openGraph: {
    title: 'Daily Management',
    description: 'Daily Management helps you managing tasks, expenses and get out of some troubles need to done today',
    siteName: 'Daily management',
    images: [
      {
        url: envConfig.NEXT_PUBLIC_BASE_API + '/logo.png',
        alt: 'Daily management logo'
      }
    ]
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
