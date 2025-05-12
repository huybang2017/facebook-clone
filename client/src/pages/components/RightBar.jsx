import Separator from "@/components/Separator/Separator";
import React, { useContext, useEffect, useState } from "react";
import Advertisement from "./Advertisement";
import { Ellipsis } from "lucide-react";
import { StoreContext } from "@/contexts/StoreProvider";
import { getUserFriends } from "@/apis/friendService";
import defaultAvatar from "@/assets/images/default_avatar.jpg";
import { Link, useNavigate } from "react-router-dom";

const RightBar = () => {
  const [friends, setFriends] = useState([]);
  const { userInfo } = useContext(StoreContext);
  useEffect(() => {
    const fetchFriends = async () => {
      if (userInfo) {
        try {
          const res = await getUserFriends(userInfo.data.userId);
          setFriends(res?.data?.userList || []);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchFriends();
  }, [userInfo]);

  return (
    <div className=" bg-white flex flex-col pb-9">
      <div className="user-contact">
        <h2 className="text-sm font-medium m-2">Người liên hệ</h2>
        {friends?.length > 0 &&
          friends?.map((friend) => {
            return (
              <Link to={`/user/profile/${friend.userId}`}>
                <div
                  key={friend.userId}
                  className="user-contact-item flex items-center p-2 mx-1 my-2 hover:bg-gray-100 hover:cursor-pointer rounded-md"
                >
                  <div className="img max-w-[40%] h-max overflow-hidden rounded-md">
                    <img
                      src={friend?.profilePicture || defaultAvatar}
                      alt="user-avatar"
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div className="ad-content pl-3 m-2">
                    <span className="text-sm text-end">
                      {friend?.firstName} {friend?.lastName}
                    </span>
                  </div>
                  <div className="option flex-grow flex justify-end">
                    <Ellipsis />
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default RightBar;
