import React from "react";
import { Link } from "react-router-dom";
import defaultAvatar from "@/assets/images/default_avatar.jpg";

const ProfileCard = ({ friend }) => {
  return (
    <div className="min-w-[100px] flex flex-col items-start justify-center border border-gray-300 rounded-lg shadow-sm">
      <Link to={`/user/profile/${friend.userId}`} className="w-full h-full">
        {/* Hình ảnh bạn bè */}
        <div
          className="w-full h-[80px] bg-cover bg-center border-b border-gray-300 bg-no-repeat rounded-t-lg cursor-pointer"
          style={{
            backgroundImage: `url(${friend?.profilePicture || defaultAvatar})`,
          }}
        ></div>
        {/* Tên bạn bè */}
        <div className="w-full flex p-0 mb-1 flex-start ml-1 text-left cursor-default">
          <span className="block text-sm font-semibold text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap hover:underline hover:cursor-pointer">
            {friend.firstName} {friend.lastName}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ProfileCard;
