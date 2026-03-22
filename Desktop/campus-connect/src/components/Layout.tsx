import { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { BottomBar } from './BottomBar';
import { AuthModal } from './AuthModal';
import { useMockData } from '../contexts/MockDataContext';

export const Layout = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useMockData();

  if (!isLoggedIn) {
    return (
      <div className="bg-black min-h-screen text-white relative">
        <AuthModal />
        <div className="filter blur-sm opacity-30 pointer-events-none">
           {children}
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white relative">
      <Sidebar />
      <main className="flex-1 md:ml-[260px] pb-24 md:pb-0 min-h-screen border-l border-[#1a1a1a] bg-black">
        {/* Top Header Placeholder (Mobile logo maybe) */}
        <div className="md:hidden flex items-center gap-3 p-4 border-b border-[#1f1f1f] bg-[#0b0a0a] sticky top-0 z-30">
          <div className="w-8 h-8 rounded-full bg-[#1e1e1e] flex items-center justify-center relative overflow-hidden ring-1 ring-white/10">
            <span className="text-[8px] text-gray-400 font-bold uppercase tracking-wider">CC</span>
          </div>
          <h1 className="text-lg font-serif tracking-wide font-bold">CampusConnect</h1>
        </div>

        {children}
      </main>
      <BottomBar />
    </div>
  );
};
