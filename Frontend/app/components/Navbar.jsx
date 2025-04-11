'use client';

import Link from 'next/link';
// import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  // const { user, role, logout, loading } = useAuth();

  if (loading) return null;

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/" className="text-xl font-bold">
        Feedback System
      </Link>

      <div className="flex gap-4 items-center">
        {role === 'student' && (
          <Link href="/dashboard/student" className="hover:text-gray-300">
            Student Dashboard
          </Link>
        )}

        {role === 'teacher' && (
          <Link href="/dashboard/teacher" className="hover:text-gray-300">
            Teacher Dashboard
          </Link>
        )}

        {user ? (
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-sm"
          >
            Logout
          </button>
        ) : (
          <Link href="/login" className="hover:text-gray-300">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
