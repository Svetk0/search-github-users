import type { Metadata } from 'next';
import StoreProvider from './StoreProvider';
import localFont from 'next/font/local';
import '../styles/globals.scss';

const openSans = localFont({
  src: '../../public/fonts/OpenSans.woff',
  variable: '--font-geist-mono',
  weight: '300 400 600',
});

export const metadata: Metadata = {
  title: 'Serch GitHub users',
  description: 'Find projects and its related info'
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <StoreProvider>
        <body className={`${openSans.className}`}>
          <main className='main'>{children}</main>
        </body>
      </StoreProvider>
    </html>
  );
}
