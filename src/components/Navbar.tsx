
import { Book, Home, Trophy, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

export default function Navbar() {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    { icon: Home, label: "Accueil", path: "/" },
    { icon: Book, label: "Leçons", path: "/lessons" },
    { icon: Trophy, label: "Classement", path: "/leaderboard" },
    { icon: User, label: "Profil", path: "/profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg px-2 py-2 z-50">
      <div className="container mx-auto">
        <ul className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <li key={item.path} className="flex-1">
                <Link
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 rounded-md transition-colors",
                    isActive 
                      ? "text-france-blue font-medium" 
                      : "text-gray-500 hover:text-france-blue"
                  )}
                >
                  <Icon className={cn("h-5 w-5", isActive && "animate-bounce-slight")} />
                  <span className="text-xs mt-1">{item.label}</span>
                  {isActive && (
                    <div className="w-1 h-1 bg-france-blue rounded-full mt-1"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
