import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wellness Hub - Kategorisierte Struktur Test',
  description: 'Test der kategorisierten Navigation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className} style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  )
}
