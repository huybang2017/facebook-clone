import axios from "axios";
import { X } from "lucide-react";
import { useState } from "react";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [visibility, setVisibility] = useState("PUBLIC");
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadMedia = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // "file" đúng key backend yêu cầu

    const res = await axios.post("http://localhost:8080/api/images", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res.data.image); // có thể là url hoặc ID ảnh backend trả về
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Upload tất cả ảnh/video trước
      const images = [];
      await Promise.all(mediaFiles.map((file) => uploadMedia(file)));

      // 2. Gửi bài viết (có thể đính kèm ID hoặc URL ảnh/video)
      const res = await axios.post("http://localhost:8080/api/posts", {
        caption,
        statusPost: "ACTIVE",
        statusShow: visibility,
        userId: "ec61d582-ea1c-4a88-9472-2a6437496910",
      });

      alert("Đăng bài thành công!");
      console.log(res.data.data, images);
    } catch (err) {
      alert("Lỗi khi gửi bài viết");
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
