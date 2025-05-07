import { Home, Users, Box, Gamepad2, MonitorPlay } from "lucide-react";
import { NavLink } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const navbarItems = [
  {
    id: 1,
    name: "Trang chủ",
    icon: <Home className="w-6 h-6 text-gray-700 hover:text-black" />,
    link: "/",
  },
  {
    id: 2,
    name: "Bạn bè",
    icon: <Users className="w-6 h-6 text-gray-700 hover:text-black" />,
    link: "/friends/list",
  },
  {
    id: 3,
    name: "Video",
    icon: <MonitorPlay className="w-6 h-6 text-gray-700 hover:text-black" />,
    link: "/video",
  },
  {
    id: 4,
    name: "Marketplace",
    icon: <Box className="w-6 h-6 text-gray-700 hover:text-black" />,
    link: "/market",
  },
  {
    id: 5,
    name: "Trò chơi",
    icon: <Gamepad2 className="w-6 h-6 text-gray-700 hover:text-black" />,
    link: "/game",
  },
];

export default function Navbar() {
  return (
    <nav className="flex items-center fixed top-[14px] left-1/2 -translate-x-1/2 px-5 z-50">
      {navbarItems.map((item) => (
        <Tippy key={item.id} content={item.name}>
          <NavLink
            to={item.link}
            variant="ghost"
            className="relative mx-2 py-4 px-10 hover:bg-gray-50 rounded-xs transition ease-in-out"
            style={({ isActive }) =>
              isActive ? { borderBottom: "4px solid blue" } : {}
            }
          >
            {item.icon}
          </NavLink>
        </Tippy>
      ))}
    </nav>
  );
}
