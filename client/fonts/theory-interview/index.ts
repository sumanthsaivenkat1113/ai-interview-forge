import { Fraunces, Inter, JetBrains_Mono } from 'next/font/google';

// Display face — used sparingly for the headline moment (InterviewStart).
export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

// Body / UI face — everything else.
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// Utility face — studio-style readouts: question counter, transcript label,
// session tally. Gives the "recording session" identity its texture.
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jbmono',
  weight: ['400', '500', '600'],
  display: 'swap',
});