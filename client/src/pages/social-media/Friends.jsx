import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axiosClient from "@/apis/axiosClient";
import { getFriends } from "@/apis/friendService";
import { ToastContext } from "@/contexts/ToastProvider";
import defaultAvatar from "@/assets/images/default_avatar.jpg";

// Dữ liệu mẫu khi API rỗng hoặc lỗi
const defaultFriends = [
  {
    id: 1,
    username: "Nguyen VAN A",
    image:
      "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
  },
  {
    id: 2,
    username: "Nguyen Uyen Uyen",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyRanzyKcvsY7HUbgray4qtLb_sMCOnKqP9Is0pAQjgKBNiXAYzg&s&ec=72940544",
  },
  {
    id: 3,
    username: "Van Aanh",
    image:
      "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
  },
  {
    id: 4,
    username: "Nguyen Thi Hoaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    image:
      "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
  },
  {
    id: 5,
    username: "Nguyen Van B",
    image:
      "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
  },
  {
    id: 6,
    username: "Nguyen Van C",
    image:
      "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
  },
  {
    id: 7,
    username: "Nguyen Van D D D D D D D",
    image:
      "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
  },
  {
    id: 8,
    username: "Nguyen Van E",
    image:
      "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
  },
  {
    id: 9,
    username: "Nguyen Van F",
    image:
      "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
  },
  {
    id: 10,
    username: "Nguyen Van G",
    image:
      "https://i.pinimg.com/236x/5e/e0/82/5ee082781b8c41406a2a50a0f32d6aa6.jpg",
  },
];

const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newFriend, setNewFriend] = useState("");
  const { toast } = useContext(ToastContext);

  // Lấy danh sách bạn bè
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const data = await getFriends();
        if (data && data.length > 0) {
          setFriends(data);
        } else {
          setFriends(defaultFriends);
        }
      } catch (error) {
        setFriends(defaultFriends);
        setError("Không thể tải danh sách bạn bè từ server!");
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  // Xử lý thêm bạn bè
  const handleAddFriend = async (e) => {
    e.preventDefault();
    if (!newFriend.trim()) {
      setError("Vui lòng nhập tên người bạn.");
      return;
    }
    try {
      const response = await axiosClient.post("/friends", {
        username: newFriend,
      });
      setFriends([...friends, response.data]);
      setNewFriend("");
      setError("");
    } catch (error) {
      setError("Không thể thêm bạn bè. Vui lòng thử lại.");
    }
  };

  // Xử lý hủy bạn bè
  const handleRemoveFriend = async (friendId) => {
    if (window.confirm("Bạn có chắc muốn hủy kết bạn với người này?")) {
      try {
        await axiosClient.delete(`/friends/${friendId}`);
        setFriends(friends.filter((friend) => friend.id !== friendId));
        setError("");
      } catch (error) {
        setError("Không thể hủy bạn bè. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="w-full min-h-screen box-border bg-white">
      {/* Header */}
      <h1 className="text-2xl font-bold p-10 -mt-4 text-gray-800">
        Danh sách bạn bè
      </h1>

      {/* Loading*/}
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang tải danh sách bạn bè...</p>
        </div>
      ) : (
        <>
          {/* Số lượng bạn bè */}
          <p className="text-gray-600 -mt-18 -mb-4 p-10 font-semibold">
            {friends.length} người bạn
          </p>

          {/* Danh sách bạn bè */}
          <div className="w-full bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 px-10 gap-2">
            {friends.map((friend) => (
              <div key={friend.id} className="w-full">
                {/* Card bạn bè */}
                <div className="min-w-[210px] flex flex-col items-start justify-center border border-gray-300 rounded-lg shadow-sm">
                  <Link to={`/profile/${friend.id}`} className="w-full h-full">
                    {/* Hình ảnh bạn bè */}
                    <div
                      className="w-full h-[210px] bg-cover bg-center border-b border-gray-300 bg-no-repeat rounded-t-lg cursor-pointer"
                      style={{ backgroundImage: `url(${friend.image})` }}
                    ></div>
                    {/* Tên bạn bè */}
                    <div className="w-full flex p-2 ml-1 text-left cursor-default">
                      <span className="block text-sm font-bold text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap hover:underline hover:cursor-pointer">
                        {friend.username}
                      </span>
                    </div>
                  </Link>
                  {/* Nút hủy kết bạn */}
                  <div className="w-full">
                    <button
                      className="mx-auto px-13 py-1 w-fit flex items-center justify-center bg-blue-600 text-white rounded-lg mb-2 hover:bg-blue-700 cursor-pointer"
                      onClick={() => handleRemoveFriend(friend.id)}
                    >
                      Hủy kết bạn
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Yêu cầu kết bạn
const FriendRequest = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useContext(ToastContext);
  const [error, setError] = useState("");
  const [newRequest, setNewRequest] = useState("");

  // Lấy danh sách yêu cầu đã gửi
  useEffect(() => {
    const fetchSentRequests = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/users");
        if (response && Array.isArray(response.data)) {
          setSentRequests(response.data);
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

  // Lấy thông tin người dùng
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosClient.get("/users");
        if (response && response.data.data) {
          setUsers(response.data.data);
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
          toast.error("Không thể tải thông tin người dùng từ server!");
        }
      }
    };
    fetchUser();
  }, []);

  // Xử lý hủy yêu cầu kết bạn
  const handleCancelRequest = async (requestId) => {
    if (window.confirm("Bạn có chắc muốn hủy yêu cầu kết bạn này?")) {
      try {
        await axiosClient.delete(`/friend-request/${requestId}`);
        setSentRequests(
          sentRequests.filter((request) => request.id !== requestId)
        );
        setError("");
      } catch (error) {
        setError("Không thể hủy yêu cầu kết bạn. Vui lòng thử lại.");
      }
    }
  };

  // Xử lý thêm bạn bè
  const handleAddFriend = async (e) => {
    e.preventDefault();
    if (!newRequest.trim()) {
      setError("Vui lòng nhập tên người bạn.");
      return;
    }
    try {
      const response = await axiosClient.post("/friend-request", {
        username: newRequest,
      });
      setSentRequests([...sentRequests, response.data]);
      setNewRequest("");
      setError("");
    } catch (error) {
      setError("Không thể gửi yêu cầu kết bạn. Vui lòng thử lại.");
    }
  };

  // Xử lý xóa đề xuất bạn bè
  const handleDeleteFriend = async (friendId) => {
    if (window.confirm("Bạn có chắc muốn gỡ bạn bè này?")) {
      try {
        await axiosClient.delete(`/friends/${friendId}`);
        setSentRequests(
          sentRequests.filter((request) => request.id !== friendId)
        );
        setError("");
      } catch (error) {
        setError("Không thể gỡ bạn bè. Vui lòng thử lại.");
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
                          onClick={() => handleCancelRequest(request.id)}
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

const FriendInvitation = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Lấy danh sách lời mời kết bạn
  useEffect(() => {
    const fetchInvitations = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get("/friend-invitation");
        if (response && response.data) {
          setInvitations(response.data);
        } else {
          // setInvitations([]);
          setInvitations(defaultFriends);
        }
      } catch (error) {
        setInvitations([]);
        setError("Không thể tải danh sách lời mời kết bạn từ server!");
      } finally {
        setLoading(false);
      }
    };
    fetchInvitations();
  }, []);

  // Xử lý chấp nhận lời mời kết bạn
  const handleAcceptInvitation = async (invitationId) => {
    if (window.confirm("Bạn có chắc muốn chấp nhận lời mời kết bạn này?")) {
      try {
        await axiosClient.post(`/friend-invitation/${invitationId}/accept`);
        setInvitations(
          invitations.filter((invitation) => invitation.id !== invitationId)
        );
        setError("");
      } catch (error) {
        setError("Không thể chấp nhận lời mời kết bạn. Vui lòng thử lại.");
      }
    }
  };

  // Xử lý từ chối lời mời kết bạn
  const handleRejectInvitation = async (invitationId) => {
    if (window.confirm("Bạn có chắc muốn từ chối lời mời kết bạn này?")) {
      try {
        await axiosClient.post(`/friend-invitation/${invitationId}/reject`);
        setInvitations(
          invitations.filter((invitation) => invitation.id !== invitationId)
        );
        setError("");
      } catch (error) {
        setError("Không thể từ chối lời mời kết bạn. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="w-full h-full box-border bg-white">
      {/* Header */}
      <h1 className="text-2xl font-bold p-10 -mt-4 text-gray-800">
        Danh sách lời mời kết bạn
      </h1>

      {/* Loading */}
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">
            Đang tải danh sách lời mời kết bạn...
          </p>
        </div>
      ) : (
        <>
          {/* Số lượng lời mời */}
          <p className="text-gray-600 -mt-18 -mb-4 p-10 font-semibold">
            {invitations.length} lời mời kết bạn
          </p>

          {/* Danh sách lời mời kết bạn */}
          <div className="w-full bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-10 gap-2">
            {invitations.map((invitation) => (
              <div key={invitation.id} className="w-full">
                {/* Card lời mời */}
                <div className="min-w-[210px] flex flex-col items-start justify-center border border-gray-300 rounded-lg shadow-sm">
                  <Link
                    to={`/profile/${invitation.id}`}
                    className="w-full h-full"
                  >
                    {/* Hình ảnh người gửi lời mời */}
                    <div
                      className="w-full h-[210px] bg-cover bg-center border-b border-gray-300 bg-no-repeat rounded-t-lg cursor-pointer"
                      style={{ backgroundImage: `url(${invitation.image})` }}
                    ></div>

                    {/* Tên người gửi lời mời */}
                    <div className="w-full flex p-2 ml-1 text-left cursor-default">
                      <span className="block text-sm font-bold text-gray-800 overflow-hidden text-ellipsis whitespace-nowrap hover:underline hover:cursor-pointer">
                        {invitation.username}
                      </span>
                    </div>
                  </Link>

                  {/* Button */}
                  <div className="w-full flex-col space-x-2">
                    <button
                      className="mx-auto px-14 py-1 w-fit flex items-center justify-center bg-blue-600 text-white rounded-lg mb-2 hover:bg-blue-700 cursor-pointer"
                      onClick={() => handleAcceptInvitation(invitation.id)}
                    >
                      Chấp nhận
                    </button>
                    <button
                      className="mx-auto px-17 py-1 w-fit flex items-center justify-center bg-gray-200 text-black rounded-lg mb-2 hover:bg-gray-300 cursor-pointer"
                      onClick={() => handleRejectInvitation(invitation.id)}
                    >
                      Từ chối
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export { Friends, FriendRequest, FriendInvitation };
