import { Link } from "react-router-dom";
import { Home, PlusCircle, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";
import Search from "./Search";

export default function Header() {
  return (
    <header className="flex items-center justify-between w-full h-[80px] px-10 bg-white border-b border-gray-300">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold text-blue-700 cursor-pointer">
          Facebook
        </h1>
      </div>
      <Navbar />
      <Search />
    </header>
  );
}
