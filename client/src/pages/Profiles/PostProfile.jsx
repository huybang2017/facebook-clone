
import React, { useState } from "react";
import PostContent from "../../components/PostContent/PostContent";
import ProfileCard from "@/components/Profile/ProfileCard.jsx";
import { Link } from "react-router-dom"; // Thêm import cho Link
const PostProfile = () => {
    const [comments, setComments] = useState([
        {
            name: "Lê Phúc",
            avatar: "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
            value: "This is a sample comment",
            time: "10 phút trước",
        },
        {
            name: "Xuân Bảo",
            avatar: "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
            value: "This is another comment",
            time: "20 phút trước",
        },
    ]);

    const postData = {
        name: "Xuân Bảo",   
        caption: "This is a sample post caption",
        image: "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
        createdAt: "10 phút trước",
        userId: 1 // Assuming this is the logged-in user's ID
    }
    // {
    //     name: "Xuân Bảo",
    //     caption: "This is a sample post caption",
    //     image: "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
    //     createdAt: "10 phút trước",
    //     userId: 1, // Assuming this is the logged-in user's ID
    // },
    // ];

    return (

        <div className="h-auto bg-gray-100 p-4">
            <div className=" flex gap-6 h-screen">
                {/* Cột trái: Danh sách bạn bè */}
                <div className="w-full md:w-1/3 h-[450px] overflow-y-hidden bg-white dark:bg-zinc-900 shadow-md rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold">Danh sách bạn bè</h2>
                        <Link to={''} className="text-blue-500 hover:text-blue-600">Xem tất cả bạn bè</Link>
                    </div>
                    <span className="block p-2 -mt-5">130 người bạn</span>
                    {/* FriendList là component hiển thị danh sách bạn bè */}
                    {/* <FriendList friends={friendData} /> */}
                    <div className="flex flex-wrap gap-4">
                        <ProfileCard
                            friend={{
                                id: 1,
                                username: "Xuân Bảo",
                                image: "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
                            }}
                        />
                        <ProfileCard
                            friend={{
                                id: 1,
                                username: "Xuân Bảo",
                                image: "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
                            }}
                        />
                        <ProfileCard
                            friend={{
                                id: 1,
                                username: "Xuân Bảo",
                                image: "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
                            }}
                        />
                        <ProfileCard
                            friend={{
                                id: 1,
                                username: "Xuân Bảo",
                                image: "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
                            }}
                        />
                        <ProfileCard
                            friend={{
                                id: 1,
                                username: "Xuân Bảo",
                                image: "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
                            }}
                        />
                        <ProfileCard
                            friend={{
                                id: 1,
                                username: "Xuân Bảo",
                                image: "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
                            }}
                        />
                        <ProfileCard
                            friend={{
                                id: 1,
                                username: "Xuân Bảo",
                                image: "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
                            }}
                        />
                        <ProfileCard
                            friend={{
                                id: 1,
                                username: "Xuân Bảo",
                                image: "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
                            }}
                        />
                        <ProfileCard
                            friend={{
                                id: 1,
                                username: "Xuân Bảo",
                                image: "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
                            }}
                        />

                    </div>
                </div>

                {/* Cột phải: Bài đăng */}
                <div className="w-full md:w-2/3">
                    <div className="bg-white dark:bg-zinc-900 shadow-md rounded-xl p-4">
                        <PostContent data={postData} comments={comments} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default PostProfile;
