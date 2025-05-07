import React from "react";
import { Link } from "react-router-dom";

const FriendCard = ({ friend, children }) => {
  return (
    <div className="min-w-[210px] flex flex-col items-start justify-center border border-gray-300 rounded-lg shadow-sm">
      <Link to={`/profile/${friend.id}`} className="w-full h-full">
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
