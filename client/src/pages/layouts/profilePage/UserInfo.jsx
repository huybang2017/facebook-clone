
import { useState, useEffect, useContext } from "react";
import axiosClient from "@/apis/axiosClient";
import { getInfo } from "@/apis/profileService";
import Button  from "@/components/Button/Button";
const defaultUser = {
    name: "Bảo Phan",
    friendCount: 0,
    image_id: "https://via.placeholder.com/150",
};

const UserInfo = () => {
    const [Modal, setModal] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                setLoading(true);
                const data = await getInfo();
                if (data) {
                    setUser(data);
                } else {
                    setUser(defaultUser);
                }
            } catch (err) {
                setUser(defaultUser);
                setError("Không thể tải thông tin người dùng!");
            } finally {
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, []);

    if (loading) return <p>Đang tải...</p>;
    if (!user) return <p>Không có dữ liệu người dùng.</p>;

    return (
        <div style={{ display: "flex", alignItems: "center", padding: "20px", position: "relative" }}>
            <div style={{ marginTop: "-75px", marginRight: "20px" }}>
                <img
                    src={user.image_id}
                    alt="Avatar"
                    style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        border: "4px solid white",
                        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                    }}
                />
            </div>

            <div>
                <h2 style={{ margin: 0 }}>{user.name}</h2>
                <p style={{ color: "gray" }}>{user.friendCount} người bạn</p>
            </div>

            <div style={{ marginLeft: "auto", display: "flex", gap: "10px" }}>
                <button style={{ padding: "8px 16px", border: "none", borderRadius: "6px", backgroundColor: "#0866FF", color: "white", fontWeight: "bold" }}>
                    + Đăng bài viết
                    </button>

                <button style={{ padding: "8px 16px", border: "none", borderRadius: "6px", backgroundColor: "#D6D9DD", fontWeight: "bold" ,color:"black", cursor:"default"}}>
                    Chỉnh sửa trang cá nhân
                </button>
                <ProfileEdit open={openModal} setOpen={setOpenModal}>
                    <h2 className="text-xl font-bold mb-4">Cập nhật ảnh đại diện</h2>
                    <form>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="mb-4"
                        />
                        {selectedFile && (
                            <p className="text-sm text-gray-600">
                                File đã chọn: {selectedFile.name}
                            </p>
                        )}
                        <button
                            type="button"
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => alert("Gửi file lên server")}
                        >
                            Lưu thay đổi
                        </button>
                    </form>
                </ProfileEdit>
            </div>
        </div>
    );
};

export default UserInfo;
