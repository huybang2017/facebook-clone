import { useState, useContext } from "react";
import { FaEdit, FaTrash, FaBan, FaUndo } from "react-icons/fa";
import useFetchAllUsers from "@/hooks/useFetchAllUsers";
import useBanUser from "@/hooks/useBanedAccount";
import { ToastContext } from "@/contexts/ToastProvider"; // Import ToastContext

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(0); // Trạng thái theo dõi trang hiện tại
  const pageSize = 10; // Kích thước trang

  const { data, isLoading, isError } = useFetchAllUsers({
    page: currentPage,
    pageSize,
  });
  const { mutate: banUser } = useBanUser(); // Giả sử bạn có hook này để ban/gỡ ban

  const { toast } = useContext(ToastContext); // Khởi tạo toast context

  // Xử lý khi tải dữ liệu
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading users</div>;

  // Hàm ban người dùng
  const handleBanUnban = (userId, currentBanStatus) => {
    // Gọi mutate để ban/gỡ ban người dùng
    banUser({ userId, banStatus: !currentBanStatus });

    // Cập nhật trạng thái ban ngay lập tức (có thể tối ưu thêm bằng cách làm async và xác nhận)
    const updatedUsers = data.userList.map((user) =>
      user.userId === userId ? { ...user, baned: !currentBanStatus } : user
    );
    // Cập nhật lại dữ liệu với danh sách người dùng đã thay đổi
    data.userList = updatedUsers;

    // Hiển thị thông báo khi ban hoặc gỡ ban
    if (!currentBanStatus) {
      toast.success("User has been banned successfully!");
    } else {
      toast.success("User has been unbanned successfully!");
    }
  };

  // Hàm chuyển đến trang trước
  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Hàm chuyển đến trang tiếp theo
  const handleNextPage = () => {
    if (currentPage < data?.pageResponse.totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="py-2 px-4 border-b">Profile</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Baned</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.userList.map((user) => (
            <tr key={user.userId} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="w-8 h-8 rounded-full bg-gray-300"></span>
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {user.firstName} {user.lastName}
              </td>
              <td className="py-2 px-4 border-b">
                {user.baned ? "Yes" : "No"}
              </td>
              <td className="py-2 px-4 border-b flex items-center space-x-2">
                <button
                  onClick={() => handleBanUnban(user.userId, user.baned)}
                  className={`flex items-center gap-1 ${
                    user.baned
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-red-600 hover:bg-red-700"
                  } text-white px-2 py-1 rounded text-xs`}
                >
                  {user.baned ? <FaUndo /> : <FaBan />}
                  {user.baned ? "Unban" : "Ban"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      {data?.pageResponse.totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Prev
          </button>
          <button
            onClick={handleNextPage}
            disabled={currentPage === data.pageResponse.totalPages - 1}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTable;
