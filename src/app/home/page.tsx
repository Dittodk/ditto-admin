import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Welcome to Accomodator Dashboard
        </h1>

        <Link
          href="/logout"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </Link>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/userlist" className="text-blue-600 hover:underline">
              Users Management
            </Link>
          </li>
          <li>
            <Link href="/list-hotels" className="text-blue-600 hover:underline">
              Properties Management
            </Link>
          </li>
          <li>
            <Link href="/reservation" className="text-blue-600 hover:underline">
              Reservation Management
            </Link>
          </li>
          <li>
            <Link href="/reports" className="text-blue-600 hover:underline">
              Reports Status
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomePage;