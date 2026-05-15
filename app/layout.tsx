import './globals.css';

import { Geist, Geist_Mono, Lora } from 'next/font/google';

import type { Metadata } from 'next';
import { Providers } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Opphex',
  description:
    'Discover hackathons, internships, fellowships, grants, and global opportunities — built for students, developers, and early-career professionals.',
  openGraph: {
    title: 'Opphex',
    description:
      'Discover hackathons, internships, fellowships, grants, and global opportunities — built for students, developers, and early-career professionals.',
    url: 'https://opphex.com',
    siteName: 'Opphex',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opphex',
    description:
      'Discover hackathons, internships, fellowships, grants, and global opportunities — built for students, developers, and early-career professionals.',
    creator: '@OfficialOpphex',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-geist-sans)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
