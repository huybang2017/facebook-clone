import axios from "axios";
import { X } from "lucide-react";
import { useContext, useState } from "react";
import { createPost } from "@/apis/postService";
import { StoreContext } from "@/contexts/StoreProvider";
import axiosClient from "@/apis/axiosClient";
import { ToastContext } from "@/contexts/ToastProvider";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [mediaFiles, setMediaFiles] = useState([]);
  // navigate
  const navigate = useNavigate();
  // Context
  const { userInfo } = useContext(StoreContext);
  const { toast } = useContext(ToastContext);
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axiosClient.post("/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Trả về đường dẫn ảnh hoặc ID tùy backend
    return res.data.image;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload ảnh/video
      const uploadedMedia = await Promise.all(mediaFiles.map(uploadMedia));

      // Tạo bài viết
      const res = await createPost({
        caption,
        statusPost: "ACTIVE",
        statusShow: visibility,
        userId: userInfo.id,
        mediaFiles: uploadedMedia,
      });

      if (res.status == 200 && res.data?.data) {
        toast.success("Đăng bài viết thành công!");
        // Reset
        setCaption("");
        setVisibility("PUBLIC");
        setMediaFiles([]);
        // Điều hướng về trang chủ sau khi tạo bài viết thành công
        navigate("/");
      }
    } catch (err) {
      toast.error("Đã xảy ra lỗi. Vui lòng kiểm tra lại.");
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl w-full h-max bg-white p-6 rounded-2xl shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Tạo bài viết</h2>

      {/* Caption */}
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        rows="4"
        placeholder="Bạn đang nghĩ gì?"
        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
      />

      {/* Chế độ hiển thị */}
      <select
        value={visibility}
        onChange={(e) => setVisibility(e.target.value)}
        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="PUBLIC">Công khai</option>
        <option value="FRIENDS">Bạn bè</option>
        <option value="PRIVATE">Riêng tư</option>
      </select>

      {/* Upload ảnh/video */}
      <input
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                   file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {/* Preview ảnh/video */}
      <div className="grid grid-cols-2 gap-4 mt-2">
        {mediaFiles.map((file, index) => {
          const url = URL.createObjectURL(file);
          return (
            <div key={index} className="relative">
              {file.type.startsWith("image/") ? (
                <img
                  src={url}
                  alt="preview"
                  className="w-full hobject-cover rounded-xl border"
                />
              ) : (
                <video
                  src={url}
                  controls
                  className="w-full h-24 object-cover rounded-xl border"
                />
              )}
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="absolute top-1 right-1 bg-white text-red-600 font-bold rounded-full w-6 h-6 text-sm flex items-center justify-center shadow hover:bg-red-500 hover:text-white transition"
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Nút đăng */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        Đăng bài
      </button>
    </form>
  );
};

export default CreatePost;
