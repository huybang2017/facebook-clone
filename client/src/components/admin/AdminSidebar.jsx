import { LogOutIcon } from "lucide-react";
import { FaUser, FaCog } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };
  return (
    <div>
      <aside className="w-[250px] bg-gray-800 text-white h-screen fixed top-0 left-0 shadow-md p-4">
        <div className="flex flex-col space-y-6">
          <h1 className="text-xl font-bold text-blue-300">Admin Panel</h1>

          <Link
            to="/admin/post"
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <FaUser />
            <span>Post</span>
          </Link>

          <Link
            to="/admin/user"
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <FaCog />
            <span>User</span>
          </Link>

          <Link
            onClick={handleLogout}
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <LogOutIcon />
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;
