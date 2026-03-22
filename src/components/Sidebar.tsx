import { NavLink } from 'react-router-dom';
import { Home, Compass, Inbox, User, Bell } from 'lucide-react';

export const Sidebar = () => {
  // Mapping the icons from Shopette UI design requirements to Campus Connect features
  // "i want these css style and these responsive side bar bottom bar replicate it"
  const navItems = [
    { label: 'Home', path: '/home', icon: Home },
    { label: 'Location', path: '/location', icon: Compass }, // Shopette Explore = Location
    { label: 'Inbox', path: '/inbox', icon: Inbox },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  return (
    <div className="hidden md:flex flex-col w-[260px] bg-[#0b0a0a] h-screen border-r border-[#1a1a1a] text-white fixed top-0 left-0 z-40">
      
      {/* Logo Area */}
      <div className="flex items-center gap-3 p-6 pt-8 mb-4">
        <div className="w-10 h-10 rounded-full bg-[#1e1e1e] flex items-center justify-center flex-shrink-0 relative overflow-hidden ring-1 ring-white/10">
           <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">CC</span>
        </div>
        <h1 className="text-xl font-serif tracking-wide font-bold">CampusConnect</h1>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-4">
        <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-4 ml-2 mt-4">
          Menu
        </div>
        
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            
            return (
              <NavLink
                key={idx}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium text-sm
                  ${isActive 
                    ? 'bg-white text-black font-semibold shadow-sm' 
                    : 'text-gray-400 hover:text-white hover:bg-[#1f1f1f]'
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-[#1a1a1a] flex flex-col gap-2">
        <button className="flex items-center gap-4 px-4 py-3 rounded-lg text-gray-400 hover:text-white hover:bg-[#1f1f1f] transition-all font-medium text-sm w-full">
          <Bell size={18} />
          <span>Notifications</span>
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1a1a1a] rounded-lg text-white hover:bg-[#252525] transition-all font-semibold text-sm w-full mt-2 ring-1 ring-white/5">
          <User size={16} />
          <span>Log Out</span>
        </button>
      </div>
      
    </div>
  );
};
