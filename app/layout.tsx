import { AuthProvider } from '@/components/auth-context';
import { SpaceFont } from '@/constant';
import type { Metadata } from 'next';

import type React from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'FitnessGH - Gym Management & Community Platform',
  description: 'Modern gym management, membership, and community platform',
  generator: 'next.js',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${SpaceFont.className} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
