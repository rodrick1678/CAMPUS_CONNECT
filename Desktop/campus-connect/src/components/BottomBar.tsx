import { NavLink } from 'react-router-dom';
import { Home, Compass, User, MessageSquare } from 'lucide-react';

export const BottomBar = () => {
  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/location', icon: Compass, label: 'Location' }, // Compass as Explore/Location
    { path: '/inbox', icon: MessageSquare, label: 'Inbox' }, // MessageSquare / Heart lookalike
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121111]/90 backdrop-blur-lg border-t border-[#1f1f1f] text-gray-400 px-6 py-4 flex justify-between items-center pb-safe rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
      {navItems.map((item, idx) => {
        const Icon = item.icon;
        
        return (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `relative flex flex-col items-center justify-center transition-all ${
                isActive ? 'text-white scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]' : 'hover:text-gray-200'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                {/* Active indicator dot */}
                <div 
                  className={`absolute -bottom-3 w-1 h-1 rounded-full bg-white transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`} 
                />
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};
