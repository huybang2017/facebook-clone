import React, { use, useContext, useEffect, useState } from "react";
import EditButton from "./EditButton";
import { useNavigate } from "react-router-dom";
import {
  CirclePlus,
  MessageCircleMore,
  Pencil,
  UserRoundMinus,
  UserRoundPlus,
} from "lucide-react";
import { getFriendshipStatus,getSentFriendRequests,getReceivedFriendRequests } from "@/apis/friendService";
import { StoreContext } from "@/contexts/StoreProvider";

const StateButton = ({ setModalOpen, isMyProfile, data }) => {
  const navigate = useNavigate();
  const [isFriend, setIsFriend] = useState(false);
  const [isSentRequest, setIsSentRequest] = useState(false);
  const [isAcceptRequest, setIsAcceptRequest] = useState(false);
  const { userInfo } = useContext(StoreContext);
  const friendId = data?.userId;
  const myId = userInfo?.data.userId;
 // trường hợp đã là bạn bè hay chưa ?
  useEffect(() => {
    const fetchIsFriend = async () => {
      if (friendId && friendId !== myId) {
        try {
          const res = await getFriendshipStatus(friendId);
          console.log(res.data);
          if (res?.data.status === "FRIENDS") {
            setIsFriend(true);
          } else {
            setIsFriend(false);
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
        }
      }
    };
    fetchIsFriend();
  }, [friendId, myId]);

// trường hợp đã gửi lời mời 
useEffect(() => {
  const fetchIsAcceptRequest = async () => {
    if (friendId && friendId !== myId) {
      try {
        const res = await getSentFriendRequests(myId);
        console.log("ds yeu cau",res.data);
        const userList = res?.data?.userList || [];
        const isSent = userList.some((user) => user.userId === friendId);        
        setIsSentRequest(isSent);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    }
  };

  fetchIsAcceptRequest();
}, [friendId, myId]);
// trường hợp đã nhận lời mời
useEffect(() => {
  const fetchIsAcceptRequest = async () => {
    if (friendId && friendId !== myId) {
      try {
        const res = await getReceivedFriendRequests(myId);
        console.log("ds loi moi",res.data);   
        const userList = res?.data?.userList || [];
        const isAccept = userList.some((user) => user.userId === friendId);
        setIsAcceptRequest(isAccept);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    }
  };

  fetchIsAcceptRequest();
}, [friendId, myId]);

  
  return (
    <div className="ml-auto grid grid-cols-1 md:grid-cols-2 gap-2">
      {isMyProfile ? (
        <>
          <EditButton
            label="Đăng bài viết"
            icon={<CirclePlus size={18} />}
            onClick={() => navigate("/create-post")}
            className="bg-blue-600 text-white hover:bg-blue-700 md:ml-auto md:w-[80%] md:h-[80%] lg:w-full lg:h-full cursor-pointer flex justify-center"
          />
          <EditButton
            icon={<Pencil size={18} className="text-black" />}
            label="Chỉnh sửa trang cá nhân"
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 rounded-md bg-gray-200 text-black cursor-pointer md:w-[80%] md:h-[80%] lg:w-full lg:h-full "
          />
        </>
      ) : (
        <>
          {isFriend ? (
            // Trường hợp là bạn bè
            <EditButton
              icon={<UserRoundMinus size={18} />}
              label="Hủy kết bạn"
              onClick={null}
              className="bg-blue-600 text-white hover:bg-blue-700"
            />
          ) : isSentRequest ? (
            // Đã gửi lời mời
            <EditButton
              icon={<UserRoundMinus size={18} />}
              label="Hủy yêu cầu"
              onClick={null}
              className="bg-blue-600 text-white hover:bg-blue-700"
            />
          ) : isAcceptRequest ? (
            <>
              <EditButton
                icon={<UserRoundPlus size={18} />}
                label="Chấp nhận"
                onClick={null}
                className="bg-blue-600 text-white hover:bg-blue-700"
              />
              <EditButton
                icon={<UserRoundMinus size={18} />}
                label="Từ chối"
                onClick={null}
                className="px-4 py-2 rounded-md bg-gray-200 text-black font-bold cursor-pointer ml-2"
              />
            </>
          ) : (
            // Không phải bạn, chưa gửi gì
            <EditButton
              icon={<UserRoundPlus size={18} />}
              label="Kết bạn"
              onClick={null}
              className="bg-blue-600 text-white hover:bg-blue-700"
            />
          )}

          {/* Nút nhắn tin */}
          <EditButton
            icon={<MessageCircleMore size={18} />}
            label="Nhắn tin"
            onClick={null}
            className="px-4 py-2 rounded-md bg-gray-200 text-black font-bold cursor-pointer ml-2"
          />
        </>
      )}
    </div>
  );
};
export default StateButton;
