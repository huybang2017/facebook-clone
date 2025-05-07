import Header from "../components/Header";
import CoverPhoto from "../layouts/profilePage/CoverPhoto.jsx";
import UserInfo from "../layouts/profilePage/UserInfo.jsx"; 
import Navbar from "../layouts/profilePage/Navbar.jsx";
const ProfilePage = ({ children }) => {
  return (

    <div className="flex bg-gray-100 h-screen w-full overflow-y-auto">
      <div className="fixed top-0 left-0 right-0 max-h-max z-10">
        <Header />
      </div>
      <div className="w-full flex justify-center">
        <div className="min-w-5xl max-w-6xl w-full">
          <div className="font-sans w-full m-0 bg-white border border-gray-300 rounded-lg">
          <CoverPhoto />
          <UserInfo />
          <Navbar />
            {children}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
