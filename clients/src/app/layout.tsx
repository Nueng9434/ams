import type { Metadata } from 'next'
import './globals.css'
import { getFont } from '@/utils/fonts'
import themeConfig from '@/config/theme'
import AuthProvider from '@/components/providers/AuthProvider'
import { Toaster } from 'react-hot-toast'

const font = getFont(themeConfig.font);

export const metadata: Metadata = {
  title: 'AMS System',
  description: 'Asset Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className={font.className}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
