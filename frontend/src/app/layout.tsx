import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'AthleteCare Pro — Performance Fitness Platform',
  description: 'Premium fitness, wellness, coaching & e-commerce platform. Track workouts, nutrition, progress, and connect with certified coaches.',
  keywords: ['fitness', 'wellness', 'coaching', 'nutrition', 'workout', 'health', 'athletecare'],
  authors: [{ name: 'AthleteCare Pro' }],
  openGraph: {
    title: 'AthleteCare Pro — Performance Fitness Platform',
    description: 'Premium fitness, wellness, coaching & e-commerce platform.',
    siteName: 'AthleteCare Pro',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} bg-surface-base text-on-surface bg-[#000000] text-[#e5e2e1] antialiased min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
