import { Bell } from "lucide-react";
import DropdownModal from "../DropdownModal";
import { useState } from "react";

// Giả lập dữ liệu thông báo
const fakeNotifications = [
  {
    id: 1,
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    content: "🔔 Bạn có đơn hàng mới!",
    sender: "Shop ABC",
    createdAt: "2 phút trước",
  },
  {
    id: 2,
    avatar: "https://www.w3schools.com/howto/img_avatar2.png",
    content: "📦 Đơn hàng đã giao thành công.",
    sender: "Shop XYZ",
    createdAt: "1 giờ trước",
  },
  {
    id: 3,
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    content: "💬 Bạn có tin nhắn mới từ shop.",
    sender: "Shop ABC",
    createdAt: "3 ngày trước",
  },
];

export default function NotificationDropdown() {
  const [notifications, setNotifications] = useState(fakeNotifications);

  return (
    <DropdownModal
      trigger={
        <div className="relative w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer">
          <Bell className="w-5 h-5 text-gray-700" />
          {notifications.length > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5 -translate-y-1/2 translate-x-1/2">
              {notifications.length}
            </span>
          )}
        </div>
      }
    >
      <div className="p-4 font-semibold text-lg border-b border-gray-300 bg-white shadow-md rounded-t-xl">
        Thông báo
      </div>
      <ul className="max-h-80 overflow-y-auto divide-y divide-gray-200 bg-white">
        {notifications.map((noti) => (
          <li key={noti.id} className="p-3 hover:bg-gray-50 cursor-pointer flex items-start space-x-3">
            <img
              src={noti.avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="font-medium">{noti.sender}</div>
              <div className="text-sm">{noti.content}</div>
              <div className="text-xs text-gray-500 mt-1">{noti.createdAt}</div>
            </div>
          </li>
        ))}
        {notifications.length === 0 && (
          <div className="p-4 text-gray-400 text-sm text-center">Không có thông báo mới</div>
        )}
      </ul>
    </DropdownModal>
  );
}

