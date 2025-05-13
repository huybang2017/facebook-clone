import IncomingCallScreen from "@/components/Message/IncomingCallScreen";
import VideoCallScreen from "@/components/Message/VideoCallScreen";
import VideoChat from "@/components/Message/VideoChat";
import { StoreContext } from "@/contexts/StoreProvider";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VideoCallPage = () => {
  const { friendId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useContext(StoreContext);
  const [isInCall, setIsInCall] = useState(false);
  const [isIncomingCall, setIsIncomingCall] = useState(false);

  useEffect(() => {
    console.log(`Starting video call for chatId: ${friendId}`);
    setIsInCall(true);
  }, [friendId]);

  const handleEndCall = () => {
    setIsInCall(false);

    if (window.opener) {
      window.close();
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    setIsIncomingCall(true);
  }, [friendId]);

  const handleAcceptCall = () => {
    setIsIncomingCall(false);
  };

  const handleDeclineCall = () => {
    setIsIncomingCall(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {/* {isInCall ? (
        <VideoCallScreen
          peerId={friendId}
          callerId={userInfo.data.userId}
          onEndCall={handleEndCall}
        />
      ) : (
        <div>
          <h1 className="text-xl font-semibold">Waiting for Call...</h1>
        </div>
      )} */}
      {/* {isIncomingCall ? (
        <IncomingCallScreen
          onAcceptCall={handleAcceptCall}
          onDeclineCall={handleDeclineCall}
          peerId={friendId}
        />
      ) : (
        <div>
          <h1 className="text-xl font-semibold">Waiting for Call...</h1>
        </div>
      )} */}
      <VideoChat userId={userInfo?.data?.userId} peerId={friendId} />
    </div>
  );
};

export default VideoCallPage;
