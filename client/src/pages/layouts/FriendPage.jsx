import React from "react";
import Header from "../components/Header";
import { NavLink } from "react-router-dom";
import { Users, Send, UserPlus } from "lucide-react";

const MenuItems = [
  {
    id: 1,
    name: "Danh sách bạn bè",
    icon: <Users className="w-5 h-5" />,
    link: "/friends",
  },
  {
    id: 2,
    name: "Yêu cầu kết bạn đã gửi",
    icon: <Send className="w-5 h-5" />,
    link: "/friend-request",
  },
  {
    id: 3,
    name: "Lời mời kết bạn",
    icon: <UserPlus className="w-5 h-5" />,
    link: "/friend-invitation",
  },
];

const FriendPage = ({ children }) => {
  return (
    <div className="flex bg-gray-100 h-screen overflow-hidden">
      <div className="fixed top-0 left-0 right-0 max-h-max z-10">
        <Header />
      </div>

      <div className="w-[360px] hidden lg:block fixed top-0 left-0 h-full p-4 mt-[81px] border-r bg-white">
        <nav className="space-y-2">
          {MenuItems.map((item) => (
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
      <div className="w-full lg:ml-[360px] mt-[80px] mr-0 overflow-y-auto max-h-[calc(100vh-100px)] min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default FriendPage;
