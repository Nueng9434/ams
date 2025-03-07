import { Inter, Kanit, Prompt, Roboto, Sarabun } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

const kanit = Kanit({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  display: 'swap',
});

const prompt = Prompt({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  display: 'swap',
});

const roboto = Roboto({ 
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const sarabun = Sarabun({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'thai'],
  display: 'swap',
});

export type FontName = 'Inter' | 'Kanit' | 'Prompt' | 'Roboto' | 'Sarabun';

const fonts = {
  'Inter': inter,
  'Kanit': kanit,
  'Prompt': prompt,
  'Roboto': roboto,
  'Sarabun': sarabun
} as const;

export const getFont = (name: FontName) => {
  return fonts[name];
};
