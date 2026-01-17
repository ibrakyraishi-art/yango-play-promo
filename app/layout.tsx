import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Yango Play - Free 60 Days',
  description: 'Get 60 days free access to the best series on Yango Play',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
