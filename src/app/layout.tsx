import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wellness Hub - NAVIGATION TEST',
  description: 'Navigation Sichtbarkeitstest',
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
        <style dangerouslySetInnerHTML={{
          __html: `
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; height: 100vh; overflow: hidden; }
          `
        }} />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}