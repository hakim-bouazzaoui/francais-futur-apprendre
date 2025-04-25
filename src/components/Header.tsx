
import { Bell, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-france-blue text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full overflow-hidden french-gradient"></div>
          <h1 className="text-xl font-bold">Nationalité Française</h1>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1">
            <div className="bg-white/20 rounded-full px-3 py-1 text-sm flex items-center gap-1">
              <span className="text-amber-300">★</span>
              <span>142 XP</span>
            </div>
            <div className="streak-indicator px-3 py-1 bg-white/20 rounded-full">
              <span>🔥</span>
              <span className="text-amber-300 ml-1">3</span>
            </div>
          </div>
          
          <div className="relative">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <Badge className="absolute -top-1 -right-1 bg-france-red w-4 h-4 flex items-center justify-center p-0">
              2
            </Badge>
          </div>
          
          <Button variant="ghost" size="icon" className="rounded-full">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
