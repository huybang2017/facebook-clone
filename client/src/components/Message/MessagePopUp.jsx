import { Camera, Phone, SendHorizontal, Video, X } from "lucide-react";
import { useState } from "react";

const MessengerPopup = ({ user, messages, isOpen, setIsOpen }) => {
  const [input, setInput] = useState("");

  const toggleMessenger = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-0 right-4 bg-white shadow-xl rounded-t-lg flex flex-col overflow-hidden border border-gray-300 w-[350px] h-[500px]">
          {/* Header */}
          <div className="flex items-center justify-between p-3 bg-[#f0f0f0] text-black rounded-t-lg">
            <div className="flex items-center gap-2">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
              <div>
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-gray-600">{user.status}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button title="Call" className="text-lg hover:text-blue-500 cursor-pointer"><Phone /></button>
              <button title="Video" className="text-lg hover:text-blue-500 cursor-pointer"><Video /></button>
              <button title="Close" className="text-lg hover:text-blue-500 cursor-pointer" onClick={toggleMessenger}><X /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#fafafa] text-black text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-4 py-2 rounded-lg ${msg.fromSelf
                  ? "bg-blue-500 ml-auto text-white"
                  : "bg-gray-200 mr-auto text-black"
                  } break-words`}
              >
                <div className="flex flex-col">
                  <p>{msg.content}</p>
                  <span className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex items-center border-t border-gray-300 p-3 bg-[#f0f0f0]">
            <button className="text-xl mr-3 hover:text-blue-500 cursor-pointer"><Camera /></button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-black text-sm placeholder-gray-500"
              placeholder="Aa"
            />
            <div className="flex items-center gap-3 ml-3">
              <button className="hover:text-blue-500 cursor-pointer"><SendHorizontal /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessengerPopup;

