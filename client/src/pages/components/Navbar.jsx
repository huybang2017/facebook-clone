import { Link } from "react-router-dom";
import { Home, Search, PlusCircle, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="flex item-center justify-around w-full bg-white py-3">
      <Link to="/">
        <Home className="w-6 h-6 text-gray-700 hover:text-black" />
      </Link>
      <Link to="/search">
        <Search className="w-6 h-6 text-gray-700 hover:text-black" />
      </Link>
      <Link to="/create">
        <Button variant="outline" className="rounded-full p-2">
          <PlusCircle className="w-6 h-6" />
        </Button>
      </Link>
      <Link to="/notifications">
        <Heart className="w-6 h-6 text-gray-700 hover:text-black" />
      </Link>
      <Link to="/profile">
        <User className="w-6 h-6 text-gray-700 hover:text-black" />
      </Link>
    </nav>
  );
}
