import { X } from "lucide-react";

const MessageBox = ({ id, sender, message, onClose }) => {
  return (
    <div className="w-80 bg-white border rounded-lg shadow-lg overflow-hidden">
      <div className="flex items-center justify-between p-3 bg-blue-500 text-white">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-gray-300"></div>
          <span className="font-semibold">{sender}</span>
        </div>
        <X
          className="w-5 h-5 cursor-pointer"
          onClick={() => onClose(id)}
        />
      </div>
      <div className="p-4 text-gray-700">{message}</div>
    </div>
  );
};
export default MessageBox;
