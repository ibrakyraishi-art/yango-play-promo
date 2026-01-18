import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yango Play',
  description: 'Watch the best Arabic series on Yango Play',
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Yango Play',
    description: 'Watch the best Arabic series on Yango Play',
    siteName: 'Yango Play',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yango Play',
    description: 'Watch the best Arabic series on Yango Play',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload all series posters for instant switching */}
        <link rel="preload" href="/posters/roses-chocolate.jpg" as="image" fetchPriority="high" />
        <link rel="preload" href="/posters/2-coffee.jpg" as="image" />
        <link rel="preload" href="/posters/ex-merati.jpg" as="image" />
        <link rel="preload" href="/posters/al-sada.jpg" as="image" />
        {/* Google Ads */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-XXXXXXXXXX');
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
