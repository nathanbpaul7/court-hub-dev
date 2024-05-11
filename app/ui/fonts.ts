import { Inter } from 'next/font/google';
import { Lusitana } from 'next/font/google';
import { Roboto } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400'],
  subsets: ['latin'],
});

export const roboto = Roboto({
  weight: ['700'],
  subsets: ['latin'],
});
export const robotoLite = Roboto({
  weight: ['400'],
  subsets: ['latin'],
});

// next/font is a module that contains all of google standard typefaces
