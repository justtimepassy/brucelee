"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const { data: authData, error: authError } = await supabase.auth.getUser();
        if (authError) {
          console.error('Auth error:', authError.message);
          setError(null);
          setLoading(false);
          return;
        }
        if (authData.user) {
          const { data: userData, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('id', authData.user.id)
            .single();
          if (fetchError || !userData) {
            setError(fetchError?.message || 'No user data found');
            setLoading(false);
            return;
          }
          setUser(userData);
        } else {
          setUser(null);
          setError(null);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setError(error.message);
      } else {
        router.push('/');
      }
    } catch (err) {
      console.error('Logout error:', err);
      setError('An unexpected error occurred during logout');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white bg-cover bg-center" style={{backgroundImage: "url('/bruce-lee-background.jpg')"}}>
      {user && <Navbar onLogout={handleLogout} />}
      <div className="flex flex-col items-center justify-center flex-1 bg-black bg-opacity-70 p-8">
        {user ? (
          <>
            <h1 className="text-4xl font-bold mb-6 text-yellow-400">Welcome, {user.name}!</h1>
            <p className="text-xl mb-8 italic">"The successful warrior is the average man, with laser-like focus." - Bruce Lee</p>
            <div className="space-y-6">
              <a href="/records/create" className="block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition duration-300 text-center">
                Log Your Practice
              </a>
              <a href="/records/view" className="block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition duration-300 text-center">
                View Your Progress
              </a>
            </div>
            {error && <p className="text-red-500 text-sm italic mt-4">{error}</p>}
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6 text-yellow-400">Welcome to Jeet Kune Do Tracker</h1>
            <p className="text-xl mb-8 italic">"Knowing is not enough, we must apply. Willing is not enough, we must do." - Bruce Lee</p>
            <div className="space-y-6">
              <a href="/auth/signin" className="block bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-full transition duration-300">
                Enter the Dojo
              </a>
              <a href="/auth/register" className="block bg-green-500 hover:bg-green-600 text-black font-bold py-3 px-6 rounded-full transition duration-300">
                Begin Your Journey
              </a>
            </div>
            {error && <p className="text-red-500 text-sm italic mt-4">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}