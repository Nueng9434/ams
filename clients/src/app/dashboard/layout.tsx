'use client'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <main className="pt-14 pl-64">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
