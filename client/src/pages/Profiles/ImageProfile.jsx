import React from "react";
import { Link } from "react-router-dom";

const ImageProfile = () => {
    const postData = [
        {
            id: 1,
            name: "Xuân Bảo",
            caption: "Ảnh 1 đẹp nè",
            image: "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
            createdAt: "10 phút trước",
        },
        {
            id: 2,
            name: "Xuân Bảo",
            caption: "Ảnh 2 chill lắm",
            image: "https://i.pinimg.com/564x/736x/5c/cc/645ccc2021783f515dd69ce72227c82b.jpg",
            createdAt: "1 giờ trước",
        },
        {
            id: 3,
            name: "Xuân Bảo",
            caption: "Ảnh 2 chill lắm",
            image: "https://i.pinimg.com/564x/736x/5c/cc/645ccc2021783f515dd69ce72227c82b.jpg",
            createdAt: "1 giờ trước",
        },
         {
            id: 4,
            name: "Xuân Bảo",
            caption: "Ảnh 2 chill lắm",
            image: "https://i.pinimg.com/564x/736x/5c/cc/645ccc2021783f515dd69ce72227c82b.jpg",
            createdAt: "1 giờ trước",
        },
          {
            id: 5,
            name: "Xuân Bảo",
            caption: "Ảnh 2 chill lắm",
            image: "https://i.pinimg.com/564x/736x/5c/cc/645ccc2021783f515dd69ce72227c82b.jpg",
            createdAt: "1 giờ trước",
        },
        {
            id: 6,
            name: "Xuân Bảo",
            caption: "Ảnh 2 chill lắm",
            image: "https://i.pinimg.com/564x/736x/5c/cc/645ccc2021783f515dd69ce72227c82b.jpg",
            createdAt: "1 giờ trước",
        },
        {
            id: 7,
            name: "Xuân Bảo",
            caption: "Ảnh 2 chill lắm",
            image: "https://i.pinimg.com/564x/736x/5c/cc/645ccc2021783f515dd69ce72227c82b.jpg",
            createdAt: "1 giờ trước",
        },
        {
            id: 8,
            name: "Xuân Bảo",
            caption: "Ảnh 2 chill lắm",
            image: "https://i.pinimg.com/564x/736x/5c/cc/645ccc2021783f515dd69ce72227c82b.jpg",
            createdAt: "1 giờ trước",
        },
        {
            id: 9,
            name: "Xuân Bảo",
            caption: "Ảnh 2 chill lắm",
            image: "https://i.pinimg.com/564x/736x/5c/cc/645ccc2021783f515dd69ce72227c82b.jpg",
            createdAt: "1 giờ trước",
        }
          
        // Thêm các post khác ở đây...
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h2 className="text-2xl font-bold text-center mb-6">Ảnh từ các bài viết</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {postData.map((post) => (
                    <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img
                            src={post.image}
                            className="w-full h-64 object-cover"
                        />
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

export default ImageProfile;
