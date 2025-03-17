'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Reservation {
  _id: string;
  userId: string;
  listingId: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  listing: {
    title: string;
  };
}

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/reservations');
      if (response.ok) {
        const data = await response.json();
        setReservations(data);
      } else {
        setError('Failed to fetch reservations');
      }
    } catch (error) {
      setError('An error occurred while fetching reservations');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/reservations', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setReservations(
          reservations.filter((reservation) => reservation._id !== id)
        );
      } else {
        setError('Failed to delete reservation');
      }
    } catch (error) {
      setError('An error occurred while deleting the reservation');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Reservations</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Hotel</th>
              <th className="px-4 py-2">Start Date</th>
              <th className="px-4 py-2">End Date</th>
              <th className="px-4 py-2">Total Price</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservations.map((reservation) => (
              <tr key={reservation._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  {reservation.user.name} ({reservation.user.email})
                </td>
                <td className="px-4 py-2">{reservation.listing.title}</td>
                <td className="px-4 py-2">
                  {new Date(reservation.startDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">
                  {new Date(reservation.endDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">${reservation.totalPrice}</td>
                <td className="px-4 py-2">
                  {new Date(reservation.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(reservation._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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
}
