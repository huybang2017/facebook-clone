import { Link } from "react-router-dom";
import { Home, User, Users, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const navbarItems = [
  {
    id: 1,
    icon: <Home className="w-6 h-6 text-gray-700 hover:text-black" />,
    link: "/",
  },
  {
    id: 2,
    icon: <Users className="w-6 h-6 text-gray-700 hover:text-black" />,
    link: "/friends",
  },
  {
    id: 3,
    icon: <Box className="w-6 h-6 text-gray-700 hover:text-black" />,
    link: "/market",
  },
  {
    id: 4,
    name: "Hồ sơ",
    icon: <User className="w-6 h-6 text-gray-700 hover:text-black" />,
    link: "/profile",
  },
];

export default function Navbar() {
  return (
    <nav className="flex items-center fixed top-[14px] left-1/2 -translate-x-1/2 px-5 z-50">
      {navbarItems.map((item) => (
        <NavLink
          to={item.link}
          key={item.id}
          variant="ghost"
          className="mx-8 py-4 px-10 hover:bg-gray-100 rounded-xs transition ease-in-out"
          style={({ isActive }) =>
            isActive ? { borderBottom: "4px solid blue" } : {}
          }
        >
          {item.icon}
        </NavLink>
      ))}
    </nav>
    // <nav className="flex items-center fixed top-[14px] left-1/2 -translate-x-1/2 px-5 z-50">
    //   <NavLink className="mx-8 py-4 px-10 border-b-4 border-blue-500" to="/">
    //     <Home className="w-6 h-6 text-gray-700 hover:text-black" />
    //   </NavLink>
    //   <NavLink
    //     className="mx-8 py-4 px-10 hover:bg-gray-100 rounded-sm transition ease-in-out"
    //     to="/profile"
    //   >
    //     <Users className="w-6 h-6 text-gray-700 hover:text-black" />
    //   </NavLink>
    //   <NavLink className="mx-8 py-4 px-10" to="/notifications">
    //     <Box className="w-6 h-6 text-gray-700 hover:text-black" />
    //   </NavLink>
    //   <NavLink className="mx-8 py-4 px-10" to="/profile">
    //     <User className="w-6 h-6 text-gray-700 hover:text-black" />
    //   </NavLink>
    // </nav>
  );
}
