'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Report {
  _id: string;
  userId: string;
  listingId: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminReportsPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch('/api/reports');
      if (response.ok) {
        const data = await response.json();
        setReports(data);
      } else {
        setError('Failed to fetch reports');
      }
    } catch (error) {
      setError('An error occurred while fetching reports');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/reports', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setReports(
          reports.filter((report) => report._id !== id)
        );
      } else {
        setError('Failed to delete report');
      }
    } catch (error) {
      setError('An error occurred while deleting the report');
    }
  };
    const handleClose = async (id: string) => {
    try {
        const response = await fetch('/api/reports', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: 'COMPLETED' }),
        });

        if (response.ok) {
        setReports(
            reports.map((report) =>
            report._id === id
                ? { ...report, status: 'COMPLETED' }
                : report
            )
        );
        } else {
        setError('Failed to close report');
        }
    } catch (error) {
        setError('An error occurred while closing the report');
    }
    };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Reports </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Property</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reports.map((report) => (
              <tr key={report._id} className="hover:bg-gray-50">
                <td className="px-4 py-2">
                  {report.user.name} ({report.user.email})
                </td>
                <td className="px-4 py-2">{report.listing.title}</td>
                <td className="px-4 py-2">
                  {report.description}
                </td>
                <td className="px-4 py-2">
                  {report.status}
                </td>
                <td className="px-4 py-2 flex gap-2">
                    <button
                        onClick={() => handleClose(report._id)}
                        disabled={report.status === 'COMPLETED'}
                        className={`px-3 py-1 rounded text-white ${
                        report.status === 'COMPLETED'
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                        Close
                    </button>

                    <button
                        onClick={() => handleDelete(report._id)}
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
