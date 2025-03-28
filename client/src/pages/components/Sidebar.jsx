import { Home, Search, PlusSquare, User, Users, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const menuItems = [
  { id: 1, name: "Trang chủ", icon: <Home className="w-5 h-5" />, link: "/" },
  {
    id: 2,
    name: "Tìm kiếm",
    icon: <Search className="w-5 h-5" />,
    link: "/search",
  },
  {
    id: 3,
    name: "Thông báo",
    icon: <Bell className="w-5 h-5" />,
    link: "/notifications",
  },
  {
    id: 4,
    name: "Tạo bài viết",
    icon: <PlusSquare className="w-5 h-5" />,
    link: "/create",
  },
  {
    id: 5,
    name: "Bạn bè",
    icon: <Users className="w-5 h-5" />,
    link: "/friends",
  },
  {
    id: 6,
    name: "Hồ sơ",
    icon: <User className="w-5 h-5" />,
    link: "/profile",
  },
];

export default function Sidebar() {
  return (
    <div className="h-screen bg-white flex flex-col pb-9">
      {/* Logo Instagram */}
      <h1 className="text-2xl font-bold text-blue-700 mb-8 cursor-pointer">
        Facebook
      </h1>

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

      <Button variant="outline" className="mt-auto">
        Đăng xuất
      </Button>
    </div>
  );
}
