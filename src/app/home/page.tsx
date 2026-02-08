import React from 'react';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to Accomodator</h1>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/userlist" className="text-blue-600 hover:underline">
              User List
            </Link>
          </li>
          <li>
            <Link href="/list-hotels" className="text-blue-600 hover:underline">
              Hotel Listings
            </Link>
          </li>
          <li>
            <Link href="/reservation" className="text-blue-600 hover:underline">
              Reservations
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
