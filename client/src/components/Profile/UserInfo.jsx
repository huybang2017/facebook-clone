import { useState, useEffect, useContext, useRef } from "react";
import { StoreContext } from "@/contexts/StoreProvider";
import { uploadImage } from "@/apis/profileService";
import EditModal from "./UserInfo/EditModal";
import CoverPhoto from "./UserInfo/CoverPhoto";
import StateButton from "./UserInfo/StateButton";
import { ToastContext } from "@/contexts/ToastProvider";
import ImageAvatar from "@/assets/images/default_avatar.jpg";
const UserInfo = ({ isMyProfile, data, fetchUserInfo }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const { toast } = useContext(ToastContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleAvatarChange = (e) => {
    // Xử lý thay đổi ảnh đại diện ở đây
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setAvatarPreview(imageURL);
    }
  };

  const handleCoverChange = (e) => {
    // Xử lý thay đổi ảnh bìa ở đây
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setCoverPreview(imageURL);
    }
  };

  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let i = 0;

      if (!avatarPreview && !coverPreview) {
        toast.info("Không có thay đổi nào được thực hiện");
        return;
      }
      // Gọi API upload ảnh đại diện nếu có
      if (avatarPreview) {
        const avatarFile = await fetch(avatarPreview).then((res) => res.blob());
        const avatarForm = new FormData();
        avatarForm.append("file", avatarFile);
        const res = await uploadImage("PROFILE_PICTURE", avatarForm);
        if (res.status == 200) {
          i++;
        }
      }

      // Gọi API upload ảnh bìa nếu có
      if (coverPreview) {
        const coverFile = await fetch(coverPreview).then((res) => res.blob());
        const coverForm = new FormData();
        coverForm.append("file", coverFile);
        const res = await uploadImage("COVER_PHOTO", coverForm);
        if (res.status == 200) {
          i++;
        }
      }

      if (i == 1 || i == 2) {
        // Add delay before success
        setAvatarPreview(null);
        setCoverPreview(null);
        toast.success("Cập nhật thành công!");
        setModalOpen(false);
        setIsUpdateSuccess(true);
      } // 2-second delay
    } catch (error) {
      toast.error("Lỗi khi upload ảnh:");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      fetchUserInfo();
      setIsUpdateSuccess(false);
    }
  }, [isUpdateSuccess]);

  return (
    <>
      <CoverPhoto coverUrl={data?.coverPhoto} />
      <div className="flex items-center px-5 py-5 relative">
        <div className="-mt-[75px] mr-5">
          <img
            src={data?.profilePicture || ImageAvatar}
            alt="Avatar"
            className="w-[150px] h-[150px] rounded-full border-[4px] border-white shadow-md object-cover"
          />
        </div>

        <div>
          <h2 className="m-0 text-lg font-semibold">
            {data?.firstName} {data?.lastName}
          </h2>
        </div>

        {/* Button Trạng thái */}
        <StateButton
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          isMyProfile={isMyProfile}
          data={data}
        />
      </div>
      {/* Hiển thị Modal */}
      <EditModal open={modalOpen} setOpen={setModalOpen} isLoading={isLoading}>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Chỉnh sửa ảnh cá nhân
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
            <img
              src={coverPreview}
              alt="Ảnh bìa"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-center ">
              <img
                src={avatarPreview}
                alt="Ảnh đại diện"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Cập nhật ảnh bìa:</label>
            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleCoverChange}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">
              Cập nhật ảnh đại diện:
            </label>
            <input
              type="file"
              accept="image/*"
              ref={avatarInputRef}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleAvatarChange}
            />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition cursor-pointer">
            Lưu thay đổi
          </button>
        </form>
      </EditModal>
    </>
  );
};

export default UserInfo;
