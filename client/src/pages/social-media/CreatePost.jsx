import { ImagePlus, X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { StoreContext } from "@/contexts/StoreProvider";
import { ToastContext } from "@/contexts/ToastProvider";
import { useNavigate } from "react-router-dom";
import { usePost } from "@/hooks/usePost";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);

  const { createPost } = usePost();
  const navigate = useNavigate();
  const { userInfo } = useContext(StoreContext);
  const { toast } = useContext(ToastContext);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ngăn đăng bài nếu không có nội dung hay file
    if (!caption.trim() && mediaFiles.length === 0) {
      toast.error("Vui lòng thêm nội dung hoặc tệp media.");
      return;
    }

    const formData = new FormData();
    formData.append("post", caption);

    mediaFiles.forEach((file) => {
      formData.append("file", file); // Backend yêu cầu key là 'file'
    });

    try {
      const response = await createPost(formData, userInfo?.data?.userId);

      if (response) {
        toast.success("Đăng bài thành công!");
        navigate("/");
      } else {
        toast.error("Đăng bài thất bại!");
      }
    } catch (error) {
      console.error("Lỗi khi đăng bài:", error);
      toast.error("Có lỗi xảy ra khi đăng bài.");
    }
  };

  // Đảm bảo người dùng đã đăng nhập
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl w-full h-max bg-white p-6 rounded-2xl shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">Tạo bài viết</h2>

      <textarea
        name="post"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        rows="4"
        placeholder="Bạn đang nghĩ gì?"
        className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y"
      />

      <div className="grid grid-cols-4 gap-4 mt-2">
        {mediaFiles.slice(0, 3).map((file, index) => {
          const url = URL.createObjectURL(file);
          const isLastVisible = index === 2 && mediaFiles.length > 3;

          return (
            <div key={index} className="relative">
              {file.type.startsWith("image/") ? (
                <div className="w-full h-40 overflow-hidden rounded-xl border">
                  <img
                    src={url}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <video
                  src={url}
                  controls
                  className="w-full h-40 object-cover rounded-xl border"
                />
              )}

              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="absolute top-1 right-1 bg-white text-red-600 font-bold rounded-full w-6 h-6 text-sm flex items-center justify-center shadow hover:bg-red-500 hover:text-white transition"
              >
                <X size={14} />
              </button>

              {isLastVisible && (
                <div className="absolute inset-0 bg-black bg-opacity-30 text-white text-lg font-semibold flex items-center justify-center rounded-xl">
                  +{mediaFiles.length - 3}
                </div>
              )}
            </div>
          );
        })}

        {/* Button thêm ảnh/video */}
        <label
          htmlFor="file"
          className="w-full h-40 flex items-center justify-center overflow-hidden rounded-xl border hover:bg-[#f6f6f6] cursor-pointer"
        >
          <ImagePlus size={40} strokeWidth={1} />
          <input
            id="file"
            name="file"
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

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
