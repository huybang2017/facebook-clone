import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/contexts/StoreProvider";
import { getPosts } from "@/apis/authService";
import { Link } from "react-router-dom";
import ImageGallery from "@/components/Profile/ImageContent/ImageGallery";

const ImageProfile = ({ data }) => {
  const { userInfo } = useContext(StoreContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = data?.userId;
  useEffect(() => {
    const fetchPosts = async () => {
      if (userId) {
        try {
          const res = await getPosts(userId);
          if (res && res.data) {
            setPosts(res.data);
          } else {
            setPosts([]);
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu:", error);
        } finally {
             setTimeout(() => {
              setLoading(false);
            }, 500);
        }
      }
    };

    fetchPosts();
  }, [userId]);

  const images =
    posts?.postList
      ?.flatMap((item) =>
        item.postImages
          ?.filter((img) => img.postImageUrl)
          .map((img, index) => ({
            url: img.postImageUrl,
            alt: `Post ${item?.postId} Image ${index}`,
          }))
      )
      .filter(Boolean) || [];

  return loading ? (
    <div className="text-center py-10">Đang tải dữ liệu người dùng...</div>
  ) : (
    <div className="min-h-screen bg-gray-100 p-6">
      <>
        <ImageGallery title="Ảnh bài viết" images={images} />
        {images.length === 0 && (
          <div className="text-center text-gray-500 mt-6">
            Không có hình ảnh nào.
          </div>
        )}
        <div className="text-center mt-8">
          <Link
            to={`/user/profile/${userInfo?.userId}`}
            className="text-blue-500 hover:underline"
          >
            ← Trở về trang cá nhân
          </Link>
        </div>
      </>
    </div>
  );
};

export default ImageProfile;
