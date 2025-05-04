import { MessageCircle } from "lucide-react";
import DropdownModal from "../DropdownModal";
import { useState } from "react";
import MessengerPopup from "./MessagePopUp";

const fakeMessages = [
  {
    id: 1,
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    content: "Chào bạn, đơn hàng của bạn đã được xác nhận!",
    sender: "Shop ABC",
    createdAt: "2 phút trước",
  },
  {
    id: 2,
    avatar: "https://www.w3schools.com/howto/img_avatar2.png",
    content: "Đơn hàng của bạn sẽ được giao vào ngày mai.",
    sender: "Shop XYZ",
    createdAt: "1 giờ trước",
  },
  {
    id: 3,
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    content: "Bạn có muốn xem các sản phẩm mới không?",
    sender: "Shop ABC",
    createdAt: "3 ngày trước",
  },
];

export default function MessageDropdown() {
  const [messages, setMessages] = useState(fakeMessages);
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <DropdownModal
        trigger={
          <div className="relative w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer">
            <MessageCircle className="w-5 h-5 text-gray-700" />
            {messages.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1.5 -translate-y-1/2 translate-x-1/2">
                {messages.length}
              </span>
            )}
          </div>
        }
      >
        <div className="p-4 font-semibold text-lg border-b border-gray-300 bg-white shadow-md rounded-t-xl">
          Tin nhắn
        </div>
        <ul className="max-h-80 overflow-y-auto divide-y divide-gray-200 bg-white">
          {messages.map((msg) => (
            <li key={msg.id} className="p-3 hover:bg-gray-50 cursor-pointer flex items-start space-x-3">
              <img
                src={msg.avatar}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="font-medium">{msg.sender}</div>
                <div className="text-sm">{msg.content}</div>
                <div className="text-xs text-gray-500 mt-1">{msg.createdAt}</div>
              </div>
            </li>
          ))}
          {messages.length === 0 && (
            <div className="p-4 text-gray-400 text-sm text-center">Không có tin nhắn mới</div>
          )}
        </ul>
      </DropdownModal>
      <MessengerPopup
        user={{ name: "Đinh Bá Sơn", avatar: "https://i.pravatar.cc/300", status: "Hoạt động 45 phút trước" }}
        messages={[
          { content: "Dậy ch", fromSelf: false },
          { content: "Bể", fromSelf: false },
          { content: "AOV_JXcBZHxasfdgasiudfhisahfdiuhsaiudhfiusahdiufhaiushdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff", fromSelf: true },
          { content: "Giúp a aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", fromSelf: true }
        ]}
        isOpen={isOpen}
      />
      <MessageDropdown />
    </>

  );
}

