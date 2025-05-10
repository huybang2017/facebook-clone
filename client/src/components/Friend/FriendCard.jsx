import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "@/assets/images/default_avatar.jpg";
import { ToastContext } from "@/contexts/ToastProvider";
import { getProfileUser } from "@/apis/friendService";

const FriendCard = ({ friend, children }) => {
  const { userId, firstName, lastName } = friend;
  const [avatar, setAvatar] = useState(defaultAvatar);
  const { toast } = useContext(ToastContext);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await getProfileUser(userId);
        setAvatar(res?.data?.profilePicture || defaultAvatar);
      } catch (error) {
        toast.error("Hệ thống đang bảo trì! Vui lòng thử lại.");
        console.error("Lỗi khi xử lý API:", error);
      }
    };

    fetchFriends();
  }, [userId, toast]);

  return (
    <div className="min-w-[210px] flex flex-col items-start justify-center border border-gray-300 rounded-lg shadow-sm">
      <Link to={`/profile/${userId}`} className="w-full h-full">
        {/* Hình ảnh bạn bè */}
        <div
          className="w-full h-[210px] bg-cover bg-center border-b border-gray-300 bg-no-repeat rounded-t-lg cursor-pointer"
          style={{ backgroundImage: `url(${avatar})` }}
        ></div>

        {/* Tên bạn bè */}
        <div className="w-full flex p-3 ml-0 text-left cursor-default">
          <span className="block text-md font-bold text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap hover:underline hover:cursor-pointer">
            {firstName} {lastName}
          </span>
        </div>
      </Link>

      {/* Children */}
      <div className="w-full box-border">
        <div className="flex justify-center items-center mx-2 mb-2 gap-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
