import { useContext, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { FaBan } from "react-icons/fa6";
import useFetchAllPostsAdmin from "@/hooks/useFetchAllPostsAdmin";
import useBanUser from "@/hooks/useBanedAccount";
import { ToastContext } from "@/contexts/ToastProvider";

const PostTable = () => {
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const { toast } = useContext(ToastContext);

  const { data, isLoading } = useFetchAllPostsAdmin({ page, pageSize });
  const postWithToxicResponseList = data?.postWithToxicResponseList;
  const totalPages = data?.pageResponse?.totalPages ?? 0;

  const { mutate: banUser } = useBanUser();

  const handleChangePage = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleDeletePost = (userId) => {
    banUser(
      { userId, baned: true },
      {
        onSuccess: () => {
          toast.success("Người dùng đã bị cấm thành công!");
        },
        onError: () => {
          toast.error("Có lỗi xảy ra khi cấm người dùng.");
        },
      }
    );
  };

  return (
    <div className="overflow-x-auto w-full">
      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Tiêu đề
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Tác giả
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Ngày tạo
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Toxic Score
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm text-gray-800">
              {postWithToxicResponseList?.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-6">
                    Không có bài viết nào.
                  </td>
                </tr>
              ) : (
                postWithToxicResponseList.map((postWrapper) => {
                  const post = postWrapper.postModel;
                  const toxic = postWrapper.toxicPostResponse;

                  return (
                    <tr key={post.postId} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{post.content}</td>
                      <td className="px-4 py-3">
                        {post.firstName} {post.lastName}
                      </td>
                      <td className="px-4 py-3">{post.timestamp}</td>
                      <td className="px-4 py-3">
                        {toxic?.averageScore?.toFixed(4)}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDeletePost(post.userId)}
                          className="text-red-600 hover:text-red-800 p-2 rounded hover:bg-red-100 transition"
                          title="Ban account"
                        >
                          <FaBan />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 space-x-1">
            <button
              onClick={() => handleChangePage(page - 1)}
              disabled={page === 0}
              className={`p-2 border rounded ${
                page === 0
                  ? "cursor-not-allowed text-gray-400"
                  : "hover:bg-gray-100"
              }`}
            >
              <LuChevronLeft />
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handleChangePage(i)}
                className={`px-3 py-1 border rounded ${
                  i === page ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handleChangePage(page + 1)}
              disabled={page >= totalPages - 1}
              className={`p-2 border rounded ${
                page >= totalPages - 1
                  ? "cursor-not-allowed text-gray-400"
                  : "hover:bg-gray-100"
              }`}
            >
              <LuChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostTable;
