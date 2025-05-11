import React, { useContext, useState } from "react";
import PostContent from "../../components/PostContent/PostContent";
import ProfileCard from "@/components/Profile/FriendContent/ProfileCard.jsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserFriends } from "@/apis/friendService";
import { StoreContext } from "@/contexts/StoreProvider";

const PostProfile = ({ data }) => {
  const [friends, setFriends] = useState([]);
  const { userInfo } = useContext(StoreContext);
  const userId = data?.userId;
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const res = await getUserFriends(userId);
        setFriends(res?.data?.userList || []);
      } catch (error) {
        console.log("Lỗi khi xử lý API fetchFriends: ", error);
      }
    };
    fetchFriends();
  }, [userId]);

  const [comments, setComments] = useState([
    {
      name: "Lê Phúc",
      avatar:
        "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
      value: "This is a sample comment",
      time: "10 phút trước",
    },
    {
      name: "Xuân Bảo",
      avatar:
        "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
      value: "This is another comment",
      time: "20 phút trước",
    },
  ]);

  const postData = {
    name: "Xuân Bảo",
    caption: "This is a sample post caption",
    image:
      "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
    createdAt: "10 phút trước",
    userId: 1, // Assuming this is the logged-in user's ID
  };

  return (
    <div className="h-auto bg-gray-100 p-4">
      <div className=" flex gap-6 h-screen">
        {/* Cột trái: Danh sách bạn bè */}
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-[450px] overflow-y-hidden bg-white dark:bg-zinc-900 shadow-md rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Danh sách bạn bè</h2>
            <Link to={"/friends"} className="text-blue-500 hover:text-blue-600">
              Xem tất cả bạn bè
            </Link>
          </div>
          {/* Responsive grid layout */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {friends
              .filter((friend) => friend.userId !== userInfo.data.userId)
              .map((friend) => (
                <ProfileCard key={friend.userId} friend={friend} />
              ))}
          </div>
        </div>

        {/* Cột phải: Bài đăng */}
        <div className="w-full md:w-2/3 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 shadow-md rounded-xl p-4">
            <PostContent data={postData} comments={comments} />
            <PostContent data={postData} comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostProfile;
