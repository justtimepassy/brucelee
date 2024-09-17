"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';
import Navbar from '../../../components/Navbar'; // Import the Navbar

export default function CreateRecord() {
  const [formData, setFormData] = useState({
    straight_jabs: '',
    straight_cross: '',
    straight_jab_cross: '',
    side_jabs: '',
    side_cross: '',
    side_jab_cross: '',
    steady_jab_cross: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (!user || userError) {
      setError('User not authenticated.');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('records')
        .insert([
          {
            user_id: user.id,
            date: new Date(),
            ...formData,
          },
        ]);

      if (error) {
        setError(error.message);
      } else {
        router.push('/'); // Redirect to records page after saving
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <Navbar /> {/* Add Navbar here */}
      <div className="flex flex-col items-center justify-center flex-1 px-4">
        <h1 className="text-3xl font-bold mb-6">Add Practice Record</h1>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSave} className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full space-y-4">
          {Object.keys(formData).map((key) => (
            <div key={key} className="flex flex-col">
              <label htmlFor={key} className="mb-2 capitalize">
                {key.replace(/_/g, ' ')}
              </label>
              <input
                type="number"
                name={key}
                id={key}
                value={formData[key]}
                onChange={handleInputChange}
                className="p-2 bg-gray-700 text-white rounded-md"
                placeholder={`Enter ${key.replace(/_/g, ' ')}`}
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Record'}
          </button>
        </form>
      </div>
    </div>
  );
}
