import { X, MicOff, Mic, VideoOff, Video } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import WebSocketService from "@/hooks/WebSocketService";

const VideoChat = ({ userId, peerId, isInitiator }) => {
  const localRef = useRef(null);
  const remoteRef = useRef(null);
  const pcRef = useRef(new RTCPeerConnection());
  const [localStream, setLocalStream] = useState(null);
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (localRef.current) localRef.current.srcObject = stream;

      stream.getTracks().forEach((track) => {
        pcRef.current.addTrack(track, stream);
      });

      pcRef.current.ontrack = (e) => {
        if (remoteRef.current) {
          console.log(remoteRef, e.streams[0]);
          remoteRef.current.srcObject = e.streams[0];
        }
      };

      pcRef.current.onicecandidate = (e) => {
        if (e.candidate) {
          WebSocketService.sendIceCandidate(e.candidate, userId, peerId);
        }
      };

      WebSocketService.connect(
        userId,
        handleOffer,
        handleAnswer,
        handleIceCandidate
      );

      if (isInitiator) {
        const offer = await pcRef.current.createOffer();
        await pcRef.current.setLocalDescription(offer);
        WebSocketService.sendOffer(
          pcRef.current.localDescription,
          userId,
          peerId
        );
        setIsRinging(true);
      }
    };

    init();

    return () => {
      pcRef.current.close();
      localStream?.getTracks().forEach((t) => t.stop());
      WebSocketService.disconnect();
    };
  }, [isInitiator, userId, peerId]);

  const handleOffer = (message) => {
    const offer = message.offer;
    pcRef.current
      .setRemoteDescription(new RTCSessionDescription(offer))
      .then(() => pcRef.current.createAnswer())
      .then((answer) => pcRef.current.setLocalDescription(answer))
      .then(() =>
        WebSocketService.sendAnswer(
          pcRef.current.localDescription,
          userId,
          peerId
        )
      );
  };

  const handleAnswer = (message) => {
    const answer = message.answer;
    pcRef.current.setRemoteDescription(new RTCSessionDescription(answer));
  };

  const handleIceCandidate = (message) => {
    const candidate = message.candidate;
    if (candidate) {
      pcRef.current.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  const toggleMic = () => {
    if (!localStream) return;
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !micMuted;
    });
    setMicMuted((prev) => !prev);
  };

  const toggleCam = () => {
    if (!localStream) return;
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !camOff;
    });
    setCamOff((prev) => !prev);
  };

  const handleEndCall = () => {
    pcRef.current.close();
    localStream?.getTracks().forEach((t) => t.stop());
    WebSocketService.disconnect();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[100000000]">
      {isRinging && (
        <div className="absolute inset-0 bg-white bg-opacity-80 flex justify-center items-center">
          <div className="bg-gray-800 text-white p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold mb-4">
              Waiting for the recipient to pick up...
            </h3>
            <p>Please wait...</p>
          </div>
        </div>
      )}

      <div className="relative w-full h-full flex flex-col items-center justify-center">
        <div className="w-full h-full flex justify-center items-center">
          <video
            ref={remoteRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="absolute top-4 right-4 w-[150px] h-[150px] rounded-sm overflow-hidden border-4 border-white">
          <video
            ref={remoteRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute bottom-4 flex justify-center gap-4 w-full">
          <button onClick={toggleMic} className="p-2 bg-gray-800 rounded-full">
            {micMuted ? (
              <MicOff className="text-white" />
            ) : (
              <Mic className="text-white" />
            )}
          </button>

          <button onClick={toggleCam} className="p-2 bg-gray-800 rounded-full">
            {camOff ? (
              <VideoOff className="text-white" />
            ) : (
              <Video className="text-white" />
            )}
          </button>

          <button
            onClick={handleEndCall}
            className="p-2 bg-red-500 rounded-full"
          >
            <X className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoChat;
