'use client'

import { useRouter } from 'next/navigation'
import useAuth from '@/store/useAuth'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-800">
                {user?.role === 'admin' ? 'หน้าจัดการระบบ' : 'หน้าข้อมูลผู้ใช้'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {user?.name} ({user?.role === 'admin' ? 'ผู้ดูแลระบบ' : 'พนักงาน'})
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                ออกจากระบบ
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user?.role === 'admin' ? (
          // Admin View
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link 
                href="/dashboard/users"
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <h2 className="text-xl font-semibold text-gray-700 mb-2">จัดการผู้ใช้</h2>
                <p className="text-gray-600">จัดการข้อมูลผู้ใช้งานในระบบ</p>
              </Link>
              {/* Add more dashboard cards here */}
            </div>
          </div>
        ) : (
          // Employee View
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">ข้อมูลผู้ใช้</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">ชื่อผู้ใช้</p>
                <p className="text-gray-800">{user?.username}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">ชื่อ</p>
                <p className="text-gray-800">{user?.name}</p>
              </div>
              {user?.email && (
                <div>
                  <p className="text-sm text-gray-500">อีเมล</p>
                  <p className="text-gray-800">{user.email}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">ตำแหน่ง</p>
                <p className="text-gray-800">พนักงาน</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
