import { Inter } from 'next/font/google'
import type { Metadata } from 'next';
import './globals.scss';
import { Header } from '~/widgets/header';
import { Footer } from '~/widgets/footer';

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

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
      <body className={`${inter.className} antialiased flex flex-col h-screen`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
