import React from "react";
import { Link } from "react-router-dom";

const friendsData = [
    {
        id: 1,
        name: "Nguyễn Văn A",
        avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    },
    {
        id: 2,
        name: "Trần Thị B",
        avatar: "https://randomuser.me/api/portraits/women/21.jpg",
    },
    {
        id: 3,
        name: "Lê Văn C",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
        id: 4,
        name: "Phạm Thị D",
        avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    },
    {
        id: 5,
        name: "Phạm Thị D",
        avatar: "https://randomuser.me/api/portraits/women/56.jpg",
    },
    // Thêm bạn bè khác nếu cần
];

const FriendProfile = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold mb-6 text-center"> Tất cả bạn bè</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {friendsData.map((friend) => (
                    <div key={friend.id} className="bg-white shadow rounded-lg p-4 text-center">
                        <img
                            src={friend.avatar}
                            alt={friend.name}
                            className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
                        />
                        <h3 className="text-lg font-semibold">{friend.name}</h3>
                        <Link
                            to={`/profile/${friend.id}`}
                            className="mt-2 inline-block text-sm text-blue-500 hover:underline"
                        >
                            Xem trang cá nhân
                        </Link>
                    </div>
                ))}
            </div>

            <div className="text-center mt-8">
                <Link to="/profile" className="text-blue-500 hover:underline">
                    ← Quay lại trang cá nhân
                </Link>
            </div>
        </div>
    );
};

export default FriendProfile;
