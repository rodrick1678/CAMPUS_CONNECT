import { Link, useLocation } from "react-router-dom";

const BottomTab = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/home", icon: "🏠", label: "Home" },
    { path: "/location", icon: "📍", label: "Location" },
    { path: "/inbox", icon: "📬", label: "Inbox" },
    { path: "/profile", icon: "👤", label: "Profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-gradient-to-t from-gray-900 via-gray-900 to-gray-800 border-t border-gray-700 flex justify-around items-center h-24 backdrop-blur-md shadow-2xl shadow-black/50">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center justify-center gap-2 py-3 px-4 rounded-2xl transition duration-300 group relative flex-1 h-full ${
            isActive(item.path)
              ? "bg-gradient-to-b from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/50"
              : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
          }`}
        >
          <span className={`text-3xl transition duration-300 ${isActive(item.path) ? "scale-125" : "group-hover:scale-120"}`}>
            {item.icon}
          </span>
          <span className={`text-xs font-bold uppercase tracking-wider ${isActive(item.path) ? "text-white" : "text-gray-400"}`}>
            {item.label}
          </span>
          
          {/* Indicator dot */}
          {isActive(item.path) && (
            <div className="absolute bottom-1 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default BottomTab;
