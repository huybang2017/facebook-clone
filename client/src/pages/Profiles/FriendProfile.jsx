import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "@/contexts/StoreProvider";
import { getUserFriends } from "@/apis/friendService";
import defaultAavatar from "@/assets/images/default_avatar.jpg";

const FriendProfile = ({ data }) => {
  const [friends, setFriends] = useState([]);
  const { userInfo } = useContext(StoreContext);
  const [avatar, setAvatar] = useState(defaultAavatar);
  const userId = data?.userId;
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await getUserFriends(userId);
        setFriends(res?.data?.userList || []);
        setAvatar(res?.data.profilePicture || defaultAavatar);
      } catch (error) {
        console.log("Lỗi khi xử lý API fetchFriends: ", error);
      }
    };
    fetchFriends();
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-12 py-10">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Tất cả bạn bè
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {friends.map((friend) => (
            <div
              key={friend.userId}
              className="bg-white hover:shadow-lg transition-shadow duration-300 shadow rounded-xl p-5 text-center"
            >
              <Link to={`/user/profile/${friend.userId}`}>
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                />
                <h3 className="text-base font-semibold text-gray-800 hover:text-blue-600 transition duration-200">
                  {friend.firstName} {friend.lastName}
                </h3>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to={`/user/profile/${userInfo?.data?.userId}`}
            className="inline-block text-blue-600 hover:text-blue-800 transition duration-200 font-medium"
          >
            ← Quay lại trang cá nhân
          </Link>
        </div>
      </div>
    </div>
  );
  
};

export default FriendProfile;
