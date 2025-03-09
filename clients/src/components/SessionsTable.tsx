'use client'

import { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { sessionService, Session } from '@/services/session.service';

export function SessionsTable() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    loadSessions();
  }, [startDate, endDate]);

  const loadSessions = async () => {
    try {
      const params: { startDate?: string; endDate?: string } = {};
      if (startDate) params.startDate = startDate;
      if (endDate) params.endDate = endDate;
      const data = await sessionService.getSessions(params);
      setSessions(data);
    } catch (error) {
      console.error('Error loading sessions:', error);
    }
  };

  const formatDuration = (duration: number | 'Active') => {
    if (duration === 'Active') return 'Active';
    const minutes = Math.floor(duration / 60);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return hours > 0 
      ? `${hours}h ${remainingMinutes}m`
      : `${minutes}m`;
  };

  return (
    <div className="space-y-4">
    

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Login Time</TableHead>
            <TableHead>Logout Time</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>IP Address</TableHead>
            <TableHead>User Agent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow key={session.id}>
              <TableCell className="font-medium">{session.user.username}</TableCell>
              <TableCell>{session.user.email}</TableCell>
              <TableCell>{new Date(session.loginTime).toLocaleString()}</TableCell>
              <TableCell>
                {session.logoutTime 
                  ? new Date(session.logoutTime).toLocaleString()
                  : 'Still Active'}
              </TableCell>
              <TableCell>{formatDuration(session.duration)}</TableCell>
              <TableCell>{session.ipAddress}</TableCell>
              <TableCell className="max-w-xs truncate" title={session.userAgent}>
                {session.userAgent}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
