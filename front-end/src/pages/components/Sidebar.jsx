import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    name: "Tạo bài viết",
    icon: <PlusSquare className="w-5 h-5" />,
    link: "/create",
  },
  {
    id: 4,
    name: "Thông báo",
    icon: <Heart className="w-5 h-5" />,
    link: "/notifications",
  },
  {
    id: 5,
    name: "Hồ sơ",
    icon: <User className="w-5 h-5" />,
    link: "/profile",
  },
];

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 flex flex-col p-4">
      {/* Logo Instagram */}
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Instagram</h1>

      {/* Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className="flex w-full justify-start gap-3 text-gray-700"
          >
            {item.icon}
            {item.name}
          </Button>
        ))}
      </nav>

      {/* Đăng xuất */}
      <Button variant="outline" className="mt-auto">
        Đăng xuất
      </Button>
    </div>
  );
}
