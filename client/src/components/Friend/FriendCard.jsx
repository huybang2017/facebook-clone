// import axiosClient from "./axiosClient";
// import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
// import defaultAvatar from "@/assets/images/default_avatar.jpg";
import { ToastContext } from "@/contexts/ToastProvider";

const FriendCard = ({ friend, children }) => {
  // const { fullname, image } = friend;
  // const { toast } = useContext(ToastContext);
  // useEffect(() => {
  //   const fetchFriends = async () => {
  //     if (friend) {
  //       try {
  //         const res = await axiosClient.get(`/friends/status/${friend.id}`);
  //         if (res && res.data) {
  //           image = res.data.image;
  //         } else {
  //           image = null;
  //         }
  //       } catch (error) {
  //         if (
  //           error.response &&
  //           error.response.data &&
  //           error.response.data.message
  //         ) {
  //           console.error(error.response.data.message);
  //         } else {
  //           console.error("Không thể tải danh sách bạn bè từ server!");
  //         }
  //       }
  //     }
  //   };
  // }, [friend]);

  return (
    <div className="min-w-[210px] flex flex-col items-start justify-center border border-gray-300 rounded-lg shadow-sm">
      <Link to={`//${friend.id}`} className="w-full h-full">
        {/* Hình ảnh bạn bè */}
        <div
          className="w-full h-[210px] bg-cover bg-center border-b border-gray-300 bg-no-repeat rounded-t-lg cursor-pointer"
          style={{ backgroundImage: `url(${friend.image})` }}
        ></div>
        {/* Tên bạn bè */}
        <div className="w-full flex p-3 ml-0 text-left cursor-default">
          <span className="block text-md font-bold text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap hover:underline hover:cursor-pointer">
            {friend.username}
          </span>
        </div>
      </Link>
      <div className="w-full box-border">
        <div className="flex justify-center items-center mx-2 mb-2">
          {children}
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
