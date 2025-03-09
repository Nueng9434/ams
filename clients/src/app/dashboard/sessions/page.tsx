import React from 'react';
import { SessionsTable } from '@/components/SessionsTable';

export const metadata = {
  title: 'User Sessions | AMS',
  description: 'View user login/logout history'
};

export default function SessionsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">User Login Sessions</h1>
      <SessionsTable />
    </div>
  );
}
