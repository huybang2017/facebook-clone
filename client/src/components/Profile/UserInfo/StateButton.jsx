import React, { use, useEffect } from "react";
import EditButton from "./EditButton";
import { useNavigate } from "react-router-dom";
import {
  CirclePlus,
  MessageCircleMore,
  Pencil,
  UserRoundMinus,
  UserRoundPlus,
} from "lucide-react";

const StateButton = ({ setModalOpen, isMyProfile, isFriend }) => {
  const navigate = useNavigate();
  return (
    <div className="ml-auto grid grid-cols-1 md:grid-cols-2 gap-2">
      {isMyProfile ? (
        (console.log("isMyProfile", isMyProfile),
        (
          <>
            <EditButton
              label="Đăng bài viết"
              icon={<CirclePlus size={18} />}
              onClick={() => navigate("/create-post")}
              className="bg-blue-600 text-white hover:bg-blue-700 md:ml-auto md:w-[80%] md:h-[80%] lg:w-full lg:h-full cursor-pointer"
            />
            <EditButton
              icon={<Pencil size={18} className="text-black" />}
              label="Chỉnh sửa trang cá nhân"
              onClick={() => setModalOpen(true)}
              className="px-4 py-2 rounded-md bg-gray-200 text-black cursor-pointer md:w-[80%] md:h-[80%] lg:w-full lg:h-full "
            />
          </>
        ))
      ) : (
        <>
          {isFriend ? (
            <EditButton
              icon={<UserRoundMinus size={18} />}
              label="Hủy kết bạn"
              onClick={null}
              className="bg-blue-600 text-white hover:bg-blue-700"
            />
          ) : (
            <EditButton
              icon={<UserRoundPlus size={18} />}
              label="Kết bạn"
              onClick={null}
              className="bg-blue-600 text-white hover:bg-blue-700"
            />
          )}
          <EditButton
            icon={<MessageCircleMore size={18} />}
            label="Nhắn tin"
            onClick={null}
            className="px-4 py-2 rounded-md bg-gray-200 text-black font-bold cursor-pointer"
          />
        </>
      )}
    </div>
  );
};
export default StateButton;
