import React, { useContext, useEffect, useState } from "react";
import EditButton from "./EditButton";
import { useNavigate } from "react-router-dom";
import {
  CirclePlus,
  MessageCircleMore,
  Pencil,
  UserRoundMinus,
  UserRoundPlus,
} from "lucide-react";
import {
  getFriendshipStatus,
  getSentFriendRequests,
  getReceivedFriendRequests,
} from "@/apis/friendService";
import { StoreContext } from "@/contexts/StoreProvider";
import {
  AddFriend,
  UnFriend,
  DeleteRequest,
  AcceptFriend,
  RejectFriend,
} from "@/utils/FriendHelper";
import { ToastContext } from "@/contexts/ToastProvider";
import useFetchAllUserChats from "@/hooks/useFetchAllUserChats";
import MessengerPopup from "@/components/Message/MessagePopUp";
import useChatUser from "@/hooks/useChatUser";
import { set } from "date-fns";

const StateButton = ({ setModalOpen, isMyProfile, data }) => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [isSentRequest, setIsSentRequest] = useState(false);
  const [isAcceptRequest, setIsAcceptRequest] = useState(false);
  const { userInfo } = useContext(StoreContext);
  const [newChat, setNewChat] = useState(null);
  const friendId = data?.userId;
  const myId = userInfo?.data.userId;

  const { data: allMessages } = useFetchAllUserChats({ userId: myId });
  const {
    mutate,
    data: chatUserResponse,
    isPending,
    isError,
    error,
  } = useChatUser();

  const chatModels =
    allMessages?.pages.flatMap((page) => page.chatModels) || [];

  const result = chatModels.find(
    (chat) => chat.privateChatUser?.userId === friendId
  );

  const handleChat = () => {
    if (!result) {
      mutate(friendId, {
        onSuccess: (response) => {
          console.log("Tạo cuộc trò chuyện thành công:", response);
          const chatPayload = {
            chatId: response?.chatId,
            chatType: "PRIVATE_CHAT",
            privateChatUser: {
              userId: friendId,
              firstName: data?.firstName,
              lastName: data?.lastName,
            },
          };
          setNewChat(chatPayload);
          setIsOpen(true);
        },
        onError: (err) => {
          console.error("Lỗi khi tạo cuộc trò chuyện:", err);
        },
      });
    } else {
      setIsOpen(true);
      setNewChat(result);
    }
  };
  console.log(newChat);

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
          console.log("ds yeu cau", res.data);
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
          console.log("ds loi moi", res.data);
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

  const handleRejectRequest = async () => {
    try {
      await RejectFriend({
        userId: myId,
        friendId: friendId,
        toast: toast,
      });
      setIsFriend(false); // Đặt trạng thái yêu cầu đã bị từ chối
    } catch (error) {
      console.error("Lỗi khi từ chối yêu cầu:", error);
    }
  };
  const handleAddFriend = async () => {
    try {
      await AddFriend({
        friendId: friendId,
        toast: toast,
      });
      setIsSentRequest(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnFriend = async () => {
    try {
      await UnFriend({
        userId: myId,
        friendId: friendId,
        toast: toast,
      });
      setIsFriend(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAcceptFriend = async () => {
    try {
      await AcceptFriend({
        userId: myId,
        friendId: friendId,
        toast: toast,
      });
      setIsFriend(true);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteRequest = async () => {
    try {
      await DeleteRequest({
        userId: myId,
        friendId: friendId,
        toast: toast,
      });
      setIsSentRequest(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
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
                onClick={() => handleUnFriend()}
                className="bg-blue-600 text-white hover:bg-blue-700"
              />
            ) : isSentRequest ? (
              // Đã gửi lời mời
              <EditButton
                icon={<UserRoundMinus size={18} />}
                label="Hủy yêu cầu"
                onClick={() => handleDeleteRequest()}
                className="bg-blue-600 text-white hover:bg-blue-700"
              />
            ) : isAcceptRequest ? (
              <>
                <EditButton
                  icon={<UserRoundPlus size={18} />}
                  label="Chấp nhận"
                  onClick={() => handleAcceptFriend()}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                />
                <EditButton
                  icon={<UserRoundMinus size={18} />}
                  label="Từ chối"
                  onClick={() => handleRejectRequest()}
                  className="px-4 py-2 rounded-md bg-gray-200 text-black font-bold cursor-pointer ml-2"
                />
              </>
            ) : (
              // Không phải bạn, chưa gửi gì
              <EditButton
                icon={<UserRoundPlus size={18} />}
                label="Kết bạn"
                onClick={() => handleAddFriend()}
                className="bg-blue-600 text-white hover:bg-blue-700"
              />
            )}

            {/* Nút nhắn tin */}
            <EditButton
              icon={<MessageCircleMore size={18} />}
              label="Nhắn tin"
              onClick={() => handleChat()}
              className="px-4 py-2 rounded-md bg-gray-200 text-black font-bold cursor-pointer ml-2"
            />
          </>
        )}
      </div>
      {(result || newChat) && (
        <MessengerPopup
          chat={result || newChat}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
};
export default StateButton;
