import { useState } from 'react';
import { useMockData } from '../contexts/MockDataContext';

export const AuthModal = () => {
  const { isLoggedIn, setIsLoggedIn } = useMockData();
  const [email, setEmail] = useState('');

  if (isLoggedIn) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-[#111111] p-8 rounded-xl w-full max-w-md shadow-2xl flex flex-col gap-6 text-white border border-[#2a2a2a]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-4">
            <span className="text-black font-semibold text-xs">Campus</span>
          </div>
          <h2 className="text-2xl font-bold font-serif mb-1">Campus Connect</h2>
          <p className="text-gray-400 text-sm">Sign in to access your campus</p>
        </div>
        
        <form className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email</label>
            <input 
              type="email" 
              className="bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors placeholder-gray-600"
              placeholder="student@campus.edu"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            className="mt-4 bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
