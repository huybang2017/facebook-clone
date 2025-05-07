
import { useState, useEffect, useContext } from "react";
import { StoreContext } from "@/contexts/StoreProvider";
import { uploadImage } from "@/apis/profileService";
import ProfileEdit from "@/components/Profile/ProfileEdit";
import CoverPhoto from "./coverphoto";
const defaultUser = {
    name: "Bảo Phan",
    friendCount: 0,
    image_id: "https://via.placeholder.com/150",
};

const UserInfo = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [coverPreview, setCoverPreview] = useState(null);
    const { toast } = useContext(StoreContext);
    const { userInfo } = useContext(StoreContext);
  
    useEffect(() => {
        if (userInfo) {
            setUser(userInfo);
            setLoading(false);
        }
    }, [userInfo]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Gọi API upload ảnh đại diện nếu có
            if (avatarPreview) {
                const avatarFile = await fetch(avatarPreview).then(res => res.blob());
                const avatarForm = new FormData();
                avatarForm.append("image", avatarFile);
                await uploadImage("avatar", avatarForm);
            }

            // Gọi API upload ảnh bìa nếu có
            if (coverPreview) {
                const coverFile = await fetch(coverPreview).then(res => res.blob());
                const coverForm = new FormData();
                coverForm.append("image", coverFile);
                await uploadImage("cover", coverForm);
            }

            alert("Cập nhật ảnh thành công!");
            setModalOpen(false);
            // Reload lại thông tin người dùng nếu cần
        } catch (error) {
            console.error("Lỗi khi upload ảnh:", error);
            alert("Đã xảy ra lỗi khi cập nhật ảnh!");
        }
    };




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



    if (loading) return <p>Đang tải...</p>;
    if (!user) return <p>Không có dữ liệu người dùng.</p>;
    console.log(user?.name);
    return (
        <>
            <CoverPhoto coverUrl={user.coverurl} />
            <div className="flex items-center px-5 py-5 relative">
                <div className="-mt-[75px] mr-5">
                    <img
                        src={user.image}
                        alt="Avatar"
                        className="w-[150px] h-[150px] rounded-full border-[4px] border-white shadow-md object-cover"
                    />
                </div>

                <div>
                    <h2 className="m-0 text-lg font-semibold">{user?.name}</h2>
                    <p className="text-gray-500">{user.friendCount} người bạn</p>
                </div>

                <div className="ml-auto flex gap-2">
                    <button className="px-4 py-2 rounded-md bg-blue-600 text-white font-bold">
                        + Đăng bài viết
                    </button>

                    <button
                        onClick={() => setModalOpen(true)}
                        className="px-4 py-2 rounded-md bg-gray-200 text-black font-bold cursor-pointer"
                    >
                        Chỉnh sửa trang cá nhân
                    </button>
                </div>
            </div>


            {/* Hiển thị Modal */}
            <ProfileEdit open={modalOpen} setOpen={setModalOpen}>
                <h2 className="text-xl font-semibold mb-4 text-center">Chỉnh sửa ảnh cá nhân</h2>

                <form className="space-y-4">
                    {/* Cover + Avatar Preview */}
                    <div className="relative w-full h-48 bg-gray-100 rounded-md overflow-hidden">
                        {/* Cover image */}
                        <img
                            src={coverPreview || "https://via.placeholder.com/800x200"}
                            alt="Ảnh bìa"
                            className="w-full h-full object-cover"
                        />

                        {/* Avatar image chồng lên */}
                        <div className="absolute inset-x-0 bottom-0 flex justify-center ">
                            <img
                                src={avatarPreview || "https://via.placeholder.com/150"}
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
                        <label className="block font-medium mb-1">Cập nhật ảnh đại diện:</label>
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
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                        onChange={handleSubmit}>
                        Lưu thay đổi
                    </button>
                </form>
            </ProfileEdit>

        </>
    );
};

export default UserInfo;
