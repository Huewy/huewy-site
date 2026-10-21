import { Analytics } from '@vercel/analytics/next'
import { Nunito } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

const nunito = Nunito({ subsets: ['latin'], variable: '--font-nunito' })
import './globals.css'

export const metadata: Metadata = {
  title: 'Huewy — More genuine reviews. Fewer fake and abusive ones.',
  description:
    "Huewy asks every customer for a review, and reports the reviews that break Google's rules. Removal is never guaranteed — Google decides. Launching soon for Australian businesses.",
  metadataBase: new URL('https://huewy.com'),
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    title: 'Huewy — More genuine reviews. Fewer fake and abusive ones.',
    description:
      "Asks every customer for a review, and reports the reviews that break Google's rules. Removal is never guaranteed — Google decides.",
    url: 'https://huewy.com',
    siteName: 'Huewy',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-AU">
      <body className={`${nunito.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
