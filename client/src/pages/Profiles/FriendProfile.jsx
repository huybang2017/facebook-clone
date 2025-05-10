import React, { useEffect,useState, useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "@/contexts/StoreProvider";
const friendsData = [
  {
    id: 1,
    name: "Duc Huy",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    id: 2,
    name: "Bao Phan",
    avatar: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    id: 3,
    name: "Phuc Le",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
  },
  {
    id: 4,
    name: "Tan Canh",
    avatar: "https://randomuser.me/api/portraits/women/56.jpg",
  },
];

const FriendProfile = () => {
  const [loading, setLoading] = useState(true);

  const { userInfo } = useContext(StoreContext);
  useEffect(() => {
    // Giả lập fetch data mất 1s
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);
  return loading ? (
    <div className="text-center py-10">Đang tải dữ liệu người dùng...</div>
  ) : (
    <div className="min-h-screen bg-gray-100 px-4 xs:px-6 sm:px-8 md:px-12 lg:px-20 py-6">
      <div className="max-w-full xs:max-w-screen-sm sm:max-w-screen-md md:max-w-4xl lg:max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Tất cả bạn bè
        </h2>

        <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {friendsData.map((friend) => (
            <div
              key={friend.id}
              className="bg-white shadow rounded-lg p-4 text-center"
            >
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
              />
              <h3 className="text-lg font-semibold">{friend.name}</h3>
              <Link
                to={`/user/profile/${friend.id}`}
                className="mt-2 inline-block text-sm text-blue-500 hover:underline"
              >
                Xem trang cá nhân
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to={`/user/profile/${userInfo?.userId}`}
            className="text-blue-500 hover:underline"
          >
            ← Quay lại trang cá nhân
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;
