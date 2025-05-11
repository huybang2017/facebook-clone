import { useState, useEffect, useContext } from "react";
import { StoreContext } from "@/contexts/StoreProvider";
import { uploadImage } from "@/apis/profileService";
import EditModal from "./UserInfo/EditModal";
import CoverPhoto from "./UserInfo/CoverPhoto";
import StateButton from "./UserInfo/StateButton";
import { ToastContext } from "@/contexts/ToastProvider";
const UserInfo = ({ isMyProfile, data, fetchUserInfo }) => {  
  const [modalOpen, setModalOpen] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
  const { toast } = useContext(ToastContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let i = 0;
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
        toast.success("Cập nhật thành công!");
        setModalOpen(false);
        setIsUpdateSuccess(true);
      }
    } catch (error) {
      toast.error("Lỗi khi upload ảnh:");
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
            src={data?.profilePicture}
            alt="Avatar"
            className="w-[150px] h-[150px] rounded-full border-[4px] border-white shadow-md object-cover"
          />
        </div>

        <div>
          <h2 className="m-0 text-lg font-semibold">
            {data?.firstName} {data?.lastName}
          </h2>
          <p className="text-gray-500">{data?.friendCount}1 người bạn</p>
        </div>

        {/* Button */}
        <StateButton
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          isMyProfile={isMyProfile}
          data = {data}
        />
      </div>

      {/* Hiển thị Modal */}
      <EditModal open={modalOpen} setOpen={setModalOpen}>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Chỉnh sửa ảnh cá nhân
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Cover + Avatar Preview */}
          <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
            {/* Cover image */}
            <img
              src={coverPreview}
              alt="Ảnh bìa"
              className="w-full h-full object-cover"
            />
            {/* Avatar image chồng lên */}
            <div className="absolute inset-x-0 bottom-0 flex justify-center ">
              <img
                src={avatarPreview}
                alt="Ảnh đại diện"
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>

          {/* Upload Cover */}
          <div>
            <label className="block font-medium mb-1">Cập nhật ảnh bìa:</label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleCoverChange}
            />
          </div>

          {/* Upload Avatar */}
          <div>
            <label className="block font-medium mb-1">
              Cập nhật ảnh đại diện:
            </label>
            <input
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                   file:rounded file:border-0 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              onChange={handleAvatarChange}
            />
          </div>

          <button
            // type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Lưu thay đổi
          </button>
        </form>
      </EditModal>
    </>
  );
};

export default UserInfo;
