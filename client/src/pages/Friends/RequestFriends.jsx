import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContext } from "@/contexts/ToastProvider";
import defaultAvatar from "@/assets/images/default_avatar.jpg";
import {
  addFriendRequest,
  getFriendRequests,
  getFriendSuggestions,
  deleteFriendRequest,
} from "@/apis/friendService";

const RequestFriends = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [newRequest, setNewRequest] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useContext(ToastContext);

  useEffect(() => {
    const fetchSentRequests = async () => {
      try {
        setLoading(true);
        const res = await getFriendRequests();
        if (res && res.data && res.data.data) {
          setSentRequests(res.data.data);
        } else {
          setSentRequests([]);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Không thể tải danh sách yêu cầu đã gửi từ server!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSentRequests();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getFriendSuggestions();
        if (res && res.data && res.data.data) {
          setUsers(res.data.data);
        } else {
          setUsers([]);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Không thể tải danh sách người dùng từ server!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDeleteRequest = async (requestId) => {
    try {
      const res = await deleteFriendRequest(requestId);
      if (res && res.data && res.data.success) {
        setSentRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== requestId)
        );
        toast.success("Đã hủy yêu cầu kết bạn thành công!");
      } else {
        toast.error("Không thể hủy yêu cầu kết bạn!");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Không thể hủy yêu cầu kết bạn từ server!");
      }
    }
  };

  const handleAddFriend = async (requestId) => {
    try {
      const res = await addFriendRequest(requestId);
      if (res && res.data && res.data.success) {
        setNewRequest(res.data.data);
        toast.success("Đã gửi yêu cầu kết bạn thành công!");
      } else {
        toast.error("Không thể gửi yêu cầu kết bạn!");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Không thể gửi yêu cầu kết bạn từ server!");
      }
    } finally {
      setLoading(false);
    }
  };

  // Xử lý xóa đề xuất bạn bè
  const handleDeleteFriend = async (friendId) => {
    try {
      const res = await delelteFriendRequest(friendId);
      if (res && res.data && res.data.success) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== friendId)
        );
        toast.success("Đã xóa đề xuất bạn bè thành công!");
      } else {
        toast.error("Không thể xóa đề xuất bạn bè!");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Không thể xóa đề xuất bạn bè từ server!");
      }
    }
  };

  return (
    <div className="w-full h-full box-border bg-white">
      {/* Header */}
      <h1 className="text-2xl font-bold p-10 -mt-4 text-gray-800">
        Danh sách đã gửi yêu cầu kết bạn
      </h1>

      {/* Loading */}
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">
            Đang tải danh sách yêu cầu kết bạn...
          </p>
        </div>
      ) : (
        <>
          <div className="w-full bg-white">
            {/* Số lượng yêu cầu đã gửi */}
            <p className="text-gray-600 -mt-18 -mb-4 p-10 font-semibold">
              {users.length} yêu cầu đã gửi
            </p>

            <div className="w-full h-full box-border bg-white pb-6">
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-10 gap-2">
                {/* Danh sách yêu cầu đã gửi */}
                {sentRequests.map((request) => (
                  <div key={request.id} className="w-full bg-white">
                    {/* Card yêu cầu */}
                    <div className="min-w-[210px] flex flex-col items-start justify-center border border-gray-300 rounded-lg shadow-sm">
                      <Link
                        to={`/profile/${request.id}`}
                        className="w-full h-full"
                      >
                        {/* Hình ảnh người nhận yêu cầu */}
                        <div
                          className="w-full h-[210px] bg-cover bg-center border-b border-gray-300 bg-no-repeat rounded-t-lg cursor-pointer"
                          style={{
                            backgroundImage: `url(${
                              request.image ?? defaultAvatar
                            })`,
                          }}
                        ></div>
                        {/* Tên người nhận yêu cầu */}
                        <div className="w-full flex p-2 ml-1 text-left cursor-default">
                          <span className="block text-sm font-bold text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap hover:underline hover:cursor-pointer">
                            {request.username}
                          </span>
                        </div>
                      </Link>
                      {/* Nút hủy yêu cầu */}
                      <div className="w-full">
                        <button
                          className="mx-auto px-13 py-1 w-fit flex items-center justify-center bg-blue-600 text-white rounded-lg mb-2 hover:bg-blue-700 cursor-pointer"
                          onClick={() => handleDeleteRequest(request.id)}
                        >
                          Hủy yêu cầu
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-[96%] mx-auto border-b border-gray-300"></div>
        </>
      )}

      {/*Đề xuất bạn bè*/}
      <div className="w-full h-full box-border bg-white">
        {/* Header */}
        <h1 className="text-2xl font-bold p-10 pt-6 pb-4  bg-white text-gray-800">
          Những người bạn có thể biết
        </h1>
        <div className="w-full bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-10 gap-2">
          {users.map((request) => (
            <div key={request.id} className="w-full">
              {/* Card yêu cầu */}
              <div className="min-w-[210px] flex flex-col items-start justify-center border border-gray-300 rounded-lg shadow-sm">
                <Link to={`/profile/${request.id}`} className="w-full h-full">
                  {/* Hình ảnh bạn bè đề xuất */}
                  <div
                    className="w-full h-[210px] bg-cover bg-center border-b border-gray-300 bg-no-repeat rounded-t-lg cursor-pointer"
                    style={{
                      backgroundImage: `url(${request.image ?? defaultAvatar})`,
                    }}
                  ></div>
                  {/* Tên bạn bè đề xuất */}
                  <div className="w-full flex p-2 ml-1 text-left cursor-default">
                    <span className="block text-sm font-bold text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap hover:underline hover:cursor-pointer">
                      {request.name}
                    </span>
                  </div>
                </Link>
                {/* Nút thêm bạn bè */}
                <div className="w-full flex-col space-x-2">
                  <button
                    className="mx-auto px-12 py-1 w-fit flex items-center justify-center bg-blue-600 text-white rounded-lg mb-2 hover:bg-blue-700 cursor-pointer"
                    onClick={() => handleAddFriend(invitation.id)}
                  >
                    Thêm bạn bè
                  </button>
                  <button
                    className="mx-auto px-21 py-1 w-fit flex items-center justify-center bg-gray-200 text-black rounded-lg mb-2 hover:bg-gray-300 cursor-pointer"
                    onClick={() => handleDeleteFriend(invitation.id)}
                  >
                    Gỡ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestFriends;
