import Header from "../components/Header";
import UserInfo from "../../components/Profile/UserInfo.jsx";
import ProfileBar from "../../components/Profile/ProfileBar.jsx";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "@/contexts/StoreProvider";
import { getProfileDetail } from "@/apis/authService";
const ProfilePage = ({ children }) => {
  const { userInfo } = useContext(StoreContext);
  const [data, setData] = useState(null);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const { id } = useParams();
  const { isFriend, setIsFriend } = useState(false);
  const navigate = useNavigate();

  const fetchUserInfo = async () => {
    try {
      const res = await getProfileDetail(id);
      const fetchedUser = res.data;

      if (userInfo.data.userId === fetchedUser.userId) {
        setData(userInfo.data);
        setIsMyProfile(true);
      } else {
        setData(fetchedUser);
        setIsMyProfile(false);
      }
    } catch (error) {
      console.error("Lỗi khi lấy thông tin người dùng:", error);
    }
  };
  useEffect(() => {
    fetchUserInfo();
  }, [id, userInfo]);

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen w-full overflow-y-auto">
      <div className="fixed top-0 left-0 right-0 z-10">
        <Header />
      </div>

      <div className="w-full flex justify-center mt-[64px] px-2 xs:px-4 sm:px-6 md:px-8 lg:px-0">
        <div className="w-full max-w-full xs:max-w-screen-sm sm:max-w-screen-md md:max-w-4xl lg:max-w-6xl">
          <div className="font-sans w-full bg-white border border-gray-300 rounded-lg">
            <UserInfo
              isMyProfile={isMyProfile}
              data={data}
              fetchUserInfo={fetchUserInfo}
            />
            <ProfileBar data={data} />

            {React.isValidElement(children)
              ? React.cloneElement(children, { data })
              : children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
