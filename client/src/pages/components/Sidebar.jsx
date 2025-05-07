import { Home, PlusSquare, User, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { id: 1, name: "Trang chủ", icon: <Home className="w-5 h-5" />, link: "/" },
  {
    id: 2,
    name: "Tạo bài viết",
    icon: <PlusSquare className="w-5 h-5" />,
    link: "/create-post",
  },
  {
    id: 3,
    name: "Bạn bè",
    icon: <Users className="w-5 h-5" />,
    link: "/friends/list",
  },
  {
    id: 4,
    name: "Hồ sơ",
    icon: <User className="w-5 h-5" />,
    link: "/profile",
  },
];

export default function Sidebar() {
  return (
    <div className="h-screen bg-white flex flex-col pb-9">
      {/* Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            to={item.link}
            key={item.id}
            variant="ghost"
            className="flex w-full justify-start items-center gap-3 text-gray-700 p-3 rounded-lg hover:bg-gray-100"
            style={({ isActive }) =>
              isActive ? { backgroundColor: "#f0f2f5" } : {}
            }
          >
            {item.icon}
            <span className="pl-3">{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
