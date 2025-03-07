'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import useAuth from '@/store/useAuth'
import Link from 'next/link'
import UserManagementTable from '@/components/UserManagementTable'
import api from '@/services/api'
import { User } from '@/types/auth'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])

  const fetchUsers = useCallback(async () => {
    if (user?.role === 'admin') {
      try {
        const response = await api.get('/users/list')
        setUsers(response.data.data.users)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    }
  }, [user?.role])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleEdit = async (userToEdit: User) => {
    // Implement edit logic
    try {
      const response = await api.put(`/users/${userToEdit.id}`, userToEdit)
      if (response.data.status === 'success') {
        fetchUsers()
      }
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  const handleDelete = async (userId: number) => {
    try {
      const response = await api.delete(`/users/${userId}`)
      if (response.data.status === 'success') {
        fetchUsers()
      }
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  const handleToggleStatus = async (userId: number, isActive: boolean) => {
    try {
      const response = await api.put(`/users/${userId}`, { isActive })
      if (response.data.status === 'success') {
        fetchUsers()
      }
    } catch (error) {
      console.error('Failed to toggle user status:', error)
    }
  }

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
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-700">จัดการผู้ใช้</h2>
                <Link 
                  href="/dashboard/users/create"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                >
                  เพิ่มผู้ใช้ใหม่
                </Link>
              </div>
              <UserManagementTable 
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
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
