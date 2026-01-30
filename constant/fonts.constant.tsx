import { Bebas_Neue, Space_Grotesk } from 'next/font/google';

export const BebasFont = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const SpaceFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
