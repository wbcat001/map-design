'use client';

import { useState } from 'react';

export default function AuthPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);

    const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })

    console.log("login response", res.body);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-violet-950">
        <div className="w-full max-w-md bg-violet-900 p-8 shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">Login</h2>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-100">Email</label>
                <input
                type="email"
                className="w-full bg-gray-900 text-gray-100 border border-violet-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-violet-500 placeholder-gray-400"
                value={email}
                placeholder="John"
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-100">Password</label>
                <input
                type="password"
                className="w-full bg-gray-900 text-gray-100 border border-violet-700 rounded p-2 focus:outline-none focus:ring-2 focus:ring-violet-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="w-full bg-violet-700 text-white p-2 rounded hover:bg-violet-600 active:bg-violet-500 active:scale-105" 
            >
                Login
            </button>
            </form>
            {/* navigation to signUp */}
            <p className="mt-4 text-center text-gray-100">
            Don't have an account?{' '}
            <a
                href="/register"
                className="text-blue-500 hover:underline"
            >
                Sign Up
            </a>
            </p>
        </div>
    </div>
  )
}
