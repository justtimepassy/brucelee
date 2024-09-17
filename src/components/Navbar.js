"use client";
import { useRouter } from 'next/navigation';
import { supabase } from '../lib/supabaseClient';

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error.message);
    } else {
      router.replace('/');
    }
  };

  return (
    <nav className="bg-black bg-opacity-70 text-yellow-400 py-4 px-6 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <a href="/" className="text-xl font-bold hover:text-white transition duration-300">Jeet Kune Do Tracker</a>
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition duration-300"
          >
            Exit Dojo
          </button>
        </div>
      </div>
    </nav>
  );
}