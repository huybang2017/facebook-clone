import React from "react";
import { NavLink } from "react-router-dom";

const ProfileBar = ({ data }) => {
  return (
    <div className="flex justify-around border-t border-gray-300 py-2.5 bg-gray-50">
      <NavLink
        to={`/user/profile/${data?.userId}`}
        className={({ isActive }) =>
          `no-underline ${
            isActive ? "text-blue-600 font-bold" : "text-gray-600"
          }`
        }
      >
        Bài viết
      </NavLink>

      <NavLink
        to={`/profile-photos/${data?.userId}`}
        className={({ isActive }) =>
          `no-underline ${
            isActive ? "text-blue-600 font-bold" : "text-gray-600"
          }`
        }
      >
        Ảnh
      </NavLink>
      <NavLink
        to={`/profile-friends/${data?.userId}`}
        className={({ isActive }) =>
          `no-underline ${
            isActive ? "text-blue-600 font-bold" : "text-gray-600"
          }`
        }
      >
        Bạn bè
      </NavLink>
    </div>
  );
};

export default ProfileBar;
