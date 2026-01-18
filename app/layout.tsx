import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yango Play',
  description: 'Watch the best Arabic series on Yango Play',
  icons: {
    icon: '/favicon.svg',
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
        <link rel="preload" href="/posters/roses-chocolate.jpg" as="image" />
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
