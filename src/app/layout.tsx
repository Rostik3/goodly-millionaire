import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

import type { Metadata } from 'next';

import './globals.scss';

const inter = Inter({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Who Wants to Be a Millionaire?',
  description: 'Simplified version of "Who Wants to Be a Millionaire?" game',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
