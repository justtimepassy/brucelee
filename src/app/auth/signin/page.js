"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../../lib/supabaseClient';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (authError) {
      setError(authError.message);
      return;
    }
    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();
    if (fetchError) {
      setError(fetchError.message);
      return;
    }
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white bg-cover bg-center" style={{backgroundImage: "url('/bruce-lee-background.jpg')"}}>
      <div className="bg-black bg-opacity-70 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400 text-center">Enter the Dojo</h1>
        <p className="text-center text-sm mb-6 italic">"Absorb what is useful, discard what is useless and add what is specifically your own." - Bruce Lee</p>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm italic">{error}</p>}
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full transition duration-300"
          >
            Enter
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Not a member yet? <a href="/auth/register" className="text-yellow-400 hover:text-yellow-300">Begin Your Journey</a>
        </p>
      </div>
    </div>
  );
}