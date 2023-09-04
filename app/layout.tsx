import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yacht App',
  description: 'yacht app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="preload" as="image" href="./one.svg"></link>
        <link rel="preload" as="image" href="./two.svg"></link>
        <link rel="preload" as="image" href="./three.svg"></link>
        <link rel="preload" as="image" href="./four.svg"></link>
        <link rel="preload" as="image" href="./five.svg"></link>
        <link rel="preload" as="image" href="./six.svg"></link>
      </head>
      <body className="font-sans">{children}</body>
    </html>
  )
}
