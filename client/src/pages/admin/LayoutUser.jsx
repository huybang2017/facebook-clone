import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Footer from "../../components/admin/AdminFooter";
import { StoreContext } from "@/contexts/StoreProvider";
import PostTable from "@/components/admin/PostTable";
import CommentTable from "@/components/admin/UserTable";

const LayoutUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo } = useContext(StoreContext);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  if (!userInfo) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-900 text-white px-6 py-4 shadow-md fixed top-0 left-0 right-0 z-40">
        <div className="text-lg font-bold">Admin Dashboard</div>
      </header>

      <div className="flex flex-1 pt-16">
        <aside className="hidden md:block w-[250px] bg-gray-800 text-white shadow-md">
          <AdminSidebar />
        </aside>

        <main className="flex-1 bg-gray-100 px-4 py-6">
          <CommentTable />
        </main>
      </div>

      {/* Footer */}
      {location.pathname === "/admin" && <Footer />}
    </div>
  );
};

export default LayoutUser;
