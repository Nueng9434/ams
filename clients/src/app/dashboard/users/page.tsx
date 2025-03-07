'use client';

import UserManagementTable from '@/components/UserManagementTable';
import { userService } from '@/services/user.service';
import { User } from '@/types/auth';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const data = await userService.getUsers();
      console.log('Fetched users:', data);
      if (!Array.isArray(data)) {
        console.error('Expected array of users but got:', data);
        toast.error('ข้อมูลผู้ใช้ไม่ถูกต้อง');
        return;
      }
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast.error('ไม่สามารถดึงข้อมูลผู้ใช้ได้');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAddUser = async (userData: Partial<User> & { password: string }) => {
    try {
      await userService.createUser(userData as {
        username: string;
        name: string;
        email?: string;
        password: string;
        role: 'admin' | 'employee';
      });
      toast.success('เพิ่มผู้ใช้สำเร็จ');
      fetchUsers();
    } catch (error) {
      toast.error('ไม่สามารถเพิ่มผู้ใช้ได้');
    }
  };

  const handleEditUser = async (userData: User) => {
    try {
      await userService.updateUser(userData.id, userData);
      toast.success('แก้ไขข้อมูลผู้ใช้สำเร็จ');
      fetchUsers();
    } catch (error) {
      toast.error('ไม่สามารถแก้ไขข้อมูลผู้ใช้ได้');
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!window.confirm('คุณต้องการลบผู้ใช้นี้ใช่หรือไม่?')) return;
    
    try {
      await userService.deleteUser(userId);
      toast.success('ลบผู้ใช้สำเร็จ');
      fetchUsers();
    } catch (error) {
      toast.error('ไม่สามารถลบผู้ใช้ได้');
    }
  };

  const handleToggleStatus = async (userId: number, isActive: boolean) => {
    try {
      await userService.toggleUserStatus(userId, isActive);
      toast.success(`${isActive ? 'เปิด' : 'ปิด'}การใช้งานผู้ใช้สำเร็จ`);
      fetchUsers();
    } catch (error) {
      toast.error('ไม่สามารถเปลี่ยนสถานะผู้ใช้ได้');
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">จัดการผู้ใช้งาน</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <UserManagementTable
          users={users}
          onAddUser={handleAddUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          onToggleStatus={handleToggleStatus}
        />
      </div>
    </div>
  );
}
