'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  _id: string;
  name: string;
  email: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        } else {
          setError(data.error);
        }
      } catch (error) {
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (email: string) => {
    try {
      const res = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setUsers(users.filter((user) => user.email !== email));
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError('Failed to delete user');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          User List Management
        </h1>

        <Link
          href="/logout"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </Link>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user: User) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="text-red-600 hover:text-red-900 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
