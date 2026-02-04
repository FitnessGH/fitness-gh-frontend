import { AuthProvider } from '@/components/auth-context';
import { SpaceFont } from '@/constant';
import type { Metadata, Viewport } from 'next';

import type React from 'react';

import './globals.css';

export const metadata: Metadata = {
  title: 'FitnessGH - Gym Management & Community Platform',
  description: 'Modern gym management, membership, and community platform',
  generator: 'next.js',
  manifest: '/manifest.json',
  keywords: [
    'fitness',
    'gym',
    'workout',
    'health',
    'membership',
    'Ghana',
    'Accra',
  ],
  authors: [{ name: 'FitnessGH' }],
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
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'FitnessGH',
  },
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'FitnessGH',
    title: 'FitnessGH - Gym Management & Community Platform',
    description: 'Modern gym management, membership, and community platform',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FitnessGH - Gym Management & Community Platform',
    description: 'Modern gym management, membership, and community platform',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#32b0b0' },
    { media: '(prefers-color-scheme: dark)', color: '#031a1b' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="manifest"
          href="/manifest.json"
        />
        <meta
          name="mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="FitnessGH"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon.png"
        />
        <link
          rel="apple-touch-startup-image"
          href="/icons/icon-512x512.png"
        />
      </head>
      <body className={`${SpaceFont.className} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
