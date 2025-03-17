'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Listing {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
}

export default function AdminListingsPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/listings');
      if (response.ok) {
        const data = await response.json();
        setListings(data);
      } else {
        setError('Failed to fetch listings');
      }
    } catch (error) {
      setError('An error occurred while fetching listings');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/listings', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setListings(listings.filter((listing) => listing._id !== id));
      } else {
        setError('Failed to delete listing');
      }
    } catch (error) {
      setError('An error occurred while deleting the listing');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Hotel Listings</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {listings.map((listing) => (
            <tr key={listing._id} className="border-b">
              <td className="px-4 py-2">{listing.title}</td>
              <td className="px-4 py-2">{listing.description}</td>
              <td className="px-4 py-2">{listing.category}</td>
              <td className="px-4 py-2">${listing.price}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDelete(listing._id)}
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
  );
}
