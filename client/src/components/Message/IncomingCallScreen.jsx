import { X, PhoneIncoming, PhoneOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const IncomingCallScreen = ({ onAcceptCall, onDeclineCall, peerId }) => {
  const navigate = useNavigate();

  // Xử lý cuộc gọi
  const acceptCall = () => {
    if (onAcceptCall) {
      onAcceptCall();
    }
    navigate(`/video-call/${peerId}`);
  };

  const rejectCall = () => {
    if (onDeclineCall) {
      onDeclineCall();
    }
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-[100000000] flex justify-center items-center">
      {/* Nền xám mờ */}
      <div className="absolute inset-0 bg-gray-600 opacity-75" />

      {/* Modal cuộc gọi đến */}
      <div className="relative z-20 bg-white rounded-lg shadow-xl p-6 max-w-[350px] w-full flex flex-col items-center justify-center">
        <div className="flex justify-between items-center w-full">
          <h3 className="text-xl font-semibold text-center">Incoming Call</h3>
          <button
            onClick={rejectCall}
            className="p-2 rounded-full text-gray-500 hover:bg-gray-200"
          >
            <X />
          </button>
        </div>
        <p className="text-center text-sm mt-2">Someone is calling you...</p>

        <div className="mt-4 flex justify-center gap-4 w-full">
          <button
            onClick={rejectCall}
            className="p-3 bg-red-500 text-white rounded-full w-[50px] h-[50px] flex justify-center items-center"
          >
            <PhoneOff />
          </button>

          <button
            onClick={acceptCall}
            className="p-3 bg-green-500 text-white rounded-full w-[50px] h-[50px] flex justify-center items-center"
          >
            <PhoneIncoming />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallScreen;
