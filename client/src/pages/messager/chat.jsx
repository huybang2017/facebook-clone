import DirectMessages from "../components/DirectMessages";
import Sidebar from "../components/Sidebar";

function Chats() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Khu vực tin nhắn */}
      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <DirectMessages />
      </div>
    </div>
  );
}

export default Chats;
