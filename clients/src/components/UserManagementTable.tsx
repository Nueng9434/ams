'use client';

import { User } from '@/types/auth';

interface UserManagementTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  onToggleStatus: (userId: number, isActive: boolean) => void;
}

export default function UserManagementTable({
  users,
  onEdit,
  onDelete,
  onToggleStatus,
}: UserManagementTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ชื่อผู้ใช้
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ชื่อ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              อีเมล
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ตำแหน่ง
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              สถานะ
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              จัดการ
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.username}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.role === 'admin' 
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {user.role === 'admin' ? 'ผู้ดูแลระบบ' : 'พนักงาน'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button
                  onClick={() => onToggleStatus(user.id, !user.isActive)}
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.isActive
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
                </button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
