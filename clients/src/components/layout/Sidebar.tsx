'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import authService from '@/services/auth.service';

type MenuItem = {
  name: string;
  href: string;
  icon: string;
  roles: string[];
};

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Get user from local storage
    const localUser = authService.getUser();
    if (localUser) {
      setUser(localUser);
    }
  }, []);

  const menuItems: MenuItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: '📊',
      roles: ['admin', 'manager', 'staff', 'tenant'],
    },
    {
      name: 'Tenants',
      href: '/tenants',
      icon: '👥',
      roles: ['admin', 'manager', 'staff'],
    },
    {
      name: 'Buildings',
      href: '/buildings',
      icon: '🏢',
      roles: ['admin', 'manager'],
    },
    {
      name: 'Rooms',
      href: '/rooms',
      icon: '🚪',
      roles: ['admin', 'manager', 'staff'],
    },
    {
      name: 'Transactions',
      href: '/transactions',
      icon: '💰',
      roles: ['admin', 'manager'],
    },
    {
      name: 'Utilities',
      href: '/utilities',
      icon: '📝',
      roles: ['admin', 'manager', 'staff'],
    },
    {
      name: 'Reports',
      href: '/reports',
      icon: '📈',
      roles: ['admin', 'manager'],
    },
    {
      name: 'Users',
      href: '/users',
      icon: '👤',
      roles: ['admin'],
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: '⚙️',
      roles: ['admin'],
    },
  ];

  // Filter menu items based on user role
  const filteredMenuItems = user
    ? menuItems.filter((item) => item.roles.includes(user.role))
    : [];

  return (
    <aside
      className={`bg-gray-800 text-white transition-all duration-300 ${
        isOpen ? 'w-64' : 'w-16'
      } min-h-screen`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 hover:bg-gray-700 w-full flex justify-end"
      >
        {isOpen ? '◀' : '▶'}
      </button>

      {/* Menu Items */}
      <nav className="mt-2">
        <ul>
          {filteredMenuItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 hover:bg-gray-700 transition-colors ${
                  pathname === item.href ? 'bg-gray-700' : ''
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                {isOpen && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
