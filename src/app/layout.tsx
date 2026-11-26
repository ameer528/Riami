import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Riami | Autonomous Sales Workforce',
  description: 'Deploy your AI sales department.',
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
