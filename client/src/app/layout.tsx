import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.scss';
import { Header } from '~/widgets/header';
import { Footer } from '~/widgets/footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900'
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900'
});

export const metadata: Metadata = {
  title: 'Аквапарк',
  description:
    'Много различных крутый горок, на которых можно кататься с семьей и друзьями. Сдаем в аренду водяные пистолеты'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}