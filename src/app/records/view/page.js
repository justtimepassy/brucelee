"use client";
import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Navbar from '../../../components/Navbar';
import { useRouter } from 'next/navigation';

export default function ViewProgress() {
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserAndRecords = async () => {
      setLoading(true);
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
          setError('User not authenticated.');
          setLoading(false);
          return;
        }

        const { data: records, error: recordsError } = await supabase
          .from('records')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false });

        if (recordsError) {
          setError(recordsError.message);
        } else {
          setRecords(records);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndRecords();
  }, [router]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white bg-cover bg-center" style={{ backgroundImage: "url('/bruce-lee-background.jpg')" }}>
      <Navbar />
      <div className="container mx-auto p-6 bg-black bg-opacity-70">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400">Your Journey</h1>
        <p className="text-center text-sm mb-6 italic">"The successful warrior is the average man, with laser-like focus." - Bruce Lee</p>
        {records.length === 0 ? (
          <p className="text-center">No records found. First Practise chey ra puka!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-center text-sm bg-gray-800 shadow-lg rounded-lg">
              <thead className="bg-yellow-500 text-black">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Straight Jabs</th>
                  <th className="px-4 py-2">Straight Cross</th>
                  <th className="px-4 py-2">Jab Cross</th>
                  <th className="px-4 py-2">Side Jabs</th>
                  <th className="px-4 py-2">Side Cross</th>
                  <th className="px-4 py-2">Side Jab Cross</th>
                  <th className="px-4 py-2">Steady Jab Cross</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-700 transition">
                    <td className="border px-4 py-2 text-yellow-400">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2 text-gray-300">
                      {record.straight_jabs}
                    </td>
                    <td className="border px-4 py-2 text-gray-300">
                      {record.straight_cross}
                    </td>
                    <td className="border px-4 py-2 text-gray-300">
                      {record.straight_jab_cross}
                    </td>
                    <td className="border px-4 py-2 text-gray-300">
                      {record.side_jabs}
                    </td>
                    <td className="border px-4 py-2 text-gray-300">
                      {record.side_cross}
                    </td>
                    <td className="border px-4 py-2 text-gray-300">
                      {record.side_jab_cross}
                    </td>
                    <td className="border px-4 py-2 text-gray-300">
                      {record.steady_jab_cross}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
