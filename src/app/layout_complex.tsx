import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SimpleLayout from '@/components/SimpleLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Wellness Hub - Ganzheitliches Wohlbefinden',
  description: 'Ein modulares Wellness-Framework für persönliche Transformation, Life-RPG und ganzheitliches Wohlbefinden',
  themeColor: '#667eea'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <SimpleLayout>
          {children}
        </SimpleLayout>
      </body>
    </html>
  )
}
