import Sidebar from "../components/Sidebar";
import ProfileComponent from "../components/Profile";
import PostGrid from "../components/PostGrid";

const Profile = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="w-[360px] hidden lg:block fixed top-0 left-0 h-full p-4 border-r bg-white">
        <Sidebar />
      </div>

      {/* Nội dung trang Profile */}
      <div className="w-full lg:ml-64 flex justify-center">
        <div className="max-w-4xl w-full px-4">
          <ProfileComponent />
        </div>
      </div>
    </div>
  );
};

export default Profile;
