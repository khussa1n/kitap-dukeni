import type { Metadata } from 'next';
import './globals.css';
import Header from './ui/header';
import Footer from './ui/footer';
import Sections from './ui/sections';
import SideBar from './ui/side-bar';

export const metadata: Metadata = {
  title: 'Kitap Dukeni',
  description: 'Kitap Dukeni',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="w-full h-full min-h-screen max-w-[2000px] flex flex-col justify-between mx-auto">
        <div className="w-full">
          <Header />
          <Sections />
          <div className="flex items-start justify-start">
            <SideBar />
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
