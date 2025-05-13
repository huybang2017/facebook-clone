import useVideoCall from "@/hooks/WebSocketService";
import { X, MicOff, Mic, VideoOff, Video } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const VideoCallScreen = ({ peerId, callerId, isInitiator, onEndCall }) => {
  const localRef = useRef(null);
  const remoteRef = useRef(null);
  const pcRef = useRef(new RTCPeerConnection());
  const [localStream, setLocalStream] = useState(null);
  const [micMuted, setMicMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [isRinging, setIsRinging] = useState(false);

  const { sendSignal } = useVideoCall({
    userId: callerId,
    onSignal: async (msg) => {
      if (msg.type === "offer") {
        setIsRinging(false);
        await pcRef.current.setRemoteDescription(
          new RTCSessionDescription(msg.offer)
        );
        const answer = await pcRef.current.createAnswer();
        console.log("Answer created:", answer);
        await pcRef.current.setLocalDescription(answer);
        sendSignal("/app/answer", {
          type: "answer",
          answer,
          receiverId: msg.senderId,
        });
      } else if (msg.type === "answer") {
        setIsRinging(false);
        await pcRef.current.setRemoteDescription(
          new RTCSessionDescription(msg.answer)
        );
      } else if (msg.type === "ice") {
        await pcRef.current.addIceCandidate(new RTCIceCandidate(msg.candidate));
      }
    },
  });

  useEffect(() => {
    const init = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("Stream started:", stream);
      setLocalStream(stream);
      if (localRef.current) localRef.current.srcObject = stream;

      stream.getTracks().forEach((track) => {
        console.log("Adding track:", track);
        pcRef.current.addTrack(track, stream);
      });

      pcRef.current.ontrack = (e) => {
        console.log("Track received:", e.streams[0]);
        if (remoteRef.current) {
          remoteRef.current.srcObject = e.streams[0];
        }
      };

      pcRef.current.onicecandidate = (e) => {
        console.log("ICE Candidate:", e.candidate);
        if (e.candidate) {
          sendSignal("/app/ice", {
            type: "ice",
            candidate: e.candidate,
            receiverId: peerId,
          });
        }
      };

      if (isInitiator) {
        console.log("Creating offer...");
        const offer = await pcRef.current.createOffer();
        console.log("Offer created:", offer);
        await pcRef.current.setLocalDescription(offer);
        sendSignal("/app/offer", {
          type: "offer",
          offer,
          receiverId: peerId,
          senderId: callerId,
        });
      }
    };

    init();

    return () => {
      pcRef.current.close();
      localStream?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const toggleMic = () => {
    if (!localStream) return;
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = micMuted;
    });
    setMicMuted((prev) => !prev);
  };

  const toggleCam = () => {
    if (!localStream) return;
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = camOff;
    });
    setCamOff((prev) => !prev);
  };

  const handleEndCall = () => {
    pcRef.current.close();
    localStream?.getTracks().forEach((t) => t.stop());
    onEndCall?.();
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
            ref={localRef}
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

export default VideoCallScreen;
