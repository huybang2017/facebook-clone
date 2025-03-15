import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ChatBox from "./ChatBox";

const users = [
  {
    id: 1,
    name: "huydev",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "Chào bạn!",
  },
  {
    id: 2,
    name: "minhcode",
    avatar: "https://i.pravatar.cc/150?img=4",
    lastMessage: "Đang làm gì đó?",
  },
  {
    id: 3,
    name: "linhdesigner",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "Hôm nay đẹp trời quá!",
  },
];

export default function DirectMessages() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="flex w-full h-screen border rounded-lg overflow-hidden">
      {/* Sidebar danh sách bạn bè */}
      <div className="w-1/3 border-r p-4 bg-white">
        <h2 className="text-lg font-semibold mb-4">Tin nhắn</h2>
        <Input placeholder="Tìm kiếm..." className="mb-4" />
        <div className="space-y-2">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <Avatar>
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-500">{user.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Khung chat */}
      <div className="w-2/3 bg-gray-50 flex flex-col">
        {selectedUser ? (
          <ChatBox user={selectedUser} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Chọn một cuộc trò chuyện để bắt đầu nhắn tin
          </div>
        )}
      </div>
    </div>
  );
}
