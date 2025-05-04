import { useState } from "react";
import MessageDropdown from "./MessageDropDown";
import MessageBox from "./MessageBox";
import { MessageSquare } from "lucide-react";

export default function MessageBoxContainer() {
  const [boxes, setBoxes] = useState([]);
  const [messages] = useState([
    { id: 1, sender: "Shop A", content: "Đơn hàng của bạn đã được gửi!", time: "1 phút trước" },
    { id: 2, sender: "Shop B", content: "Chào bạn, chúng tôi có sản phẩm mới!", time: "2 giờ trước" },
    { id: 3, sender: "Shop C", content: "Đơn hàng đã hoàn thành, cảm ơn bạn!", time: "3 ngày trước" },
  ]);

  const handleSelectMessage = (message) => {
    if (boxes.length < 3) {
      setBoxes((prev) => [
        ...prev,
        { id: message.id, sender: message.sender, message: message.content },
      ]);
    }
  };

  const handleCloseBox = (id) => {
    setBoxes((prevBoxes) => prevBoxes.filter((box) => box.id !== id));
  };

  return (
    <div className="fixed bottom-4 right-4 space-y-4 z-50">
      <MessageDropdown messages={messages} onSelectMessage={handleSelectMessage} />

      {boxes.map((box) => (
        <MessageBox
          key={box.id}
          id={box.id}
          sender={box.sender}
          message={box.message}
          onClose={handleCloseBox}
        />
      ))}

      {boxes.length < 3 && (
        <div className="w-80 bg-white border rounded-lg shadow-lg overflow-hidden p-3 text-gray-700 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-gray-500" />
          <span className="ml-2">Bạn có thể gửi tin nhắn mới ở đây.</span>
        </div>
      )}
    </div>
  );
}
