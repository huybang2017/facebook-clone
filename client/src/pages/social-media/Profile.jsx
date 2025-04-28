import Sidebar from "../components/Sidebar";
import ProfileComponent from "../components/Profile";

const Profile = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-4xl w-full px-4">
        <ProfileComponent />
      </div>
    </div>
  );
};

export default Profile;
