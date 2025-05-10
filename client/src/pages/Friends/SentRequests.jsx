import React, { useEffect, useState, useContext } from "react";
import { ToastContext } from "@/contexts/ToastProvider";
import { StoreContext } from "@/contexts/StoreProvider";
import {
  getSentFriendRequests,
  getFriendSuggestions,
  addFriendRequest,
  deleteFriendRequest,
} from "@/apis/friendService";
import FriendCard from "@/components/Friend/FriendCard";
import Button from "@/components/Button/Button";

const SentRequests = () => {
  const [sentRequests, setSentRequests] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSentReuquest, setLoadingSentReuquest] = useState(true);
  const [loadingSuggest, setLoadingSuggest] = useState(true);
  const { toast } = useContext(ToastContext);
  const { userInfo } = useContext(StoreContext);

  useEffect(() => {
    const fetchSentRequests = async () => {
      if (userInfo) {
        try {
          setLoadingSentReuquest(true);
          const res = await getSentFriendRequests(userInfo.data.userId);
          setSentRequests(res?.data?.userList || []);
        } catch (error) {
          toast.error("Hệ thống đang bảo trì. Vui lòng thử lại!");
          console.log("Lỗi khi xử lý API fetchSentRequests: ", error);
        } finally {
          setLoadingSentReuquest(false);
        }
      }
    };
    fetchSentRequests();
  }, [userInfo, toast]);

  useEffect(() => {
    const fetchUserSuggests = async () => {
      if (userInfo) {
        try {
          setLoadingSuggest(true);
          const res = await getFriendSuggestions(userInfo.data.userId);
          setSuggestions(res?.data?.userList || []);
        } catch (error) {
          toast.error("Hệ thống đang bảo trì. Vui lòng thử lại!");
          console.log("Lỗi khi xử lý API getFriendSuggestions: ", error);
        } finally {
          setLoadingSuggest(false);
        }
      }
    };
    fetchUserSuggests();
  }, [userInfo, toast]);

  // Thêm bạn bè
  const handleAddFriend = async (strangerUserId) => {
    try {
      const res = await addFriendRequest(strangerUserId);
      if (res?.status === 200) {
        toast.success("Đã gửi yêu cầu kết bạn thành công!");

        const addedUser = suggestions.find(
          (user) => user.userId === strangerUserId
        );
        setSuggestions((prev) =>
          prev.filter((request) => request.userId !== strangerUserId)
        );
        if (addedUser) {
          setSentRequests((prev) => [...prev, addedUser]);
        }
      } else {
        toast.error("Không thể gửi yêu cầu kết bạn!");
      }
    } catch (error) {
      toast.error("Hệ thống đang bảo trì! Vui lòng thử lại.");
      console.log("Lỗi khi xử lý API handleAddFriend: ", error);
    }
  };

  // Hủy yêu cầu kết bạn từ user -> stranger
  const handleDeleteRequest = async (strangerUserId) => {
    try {
      const res = await deleteFriendRequest(
        userInfo.data.userId, // sent
        strangerUserId // received
      );
      if (res?.status === 200) {
        toast.success("Đã hủy yêu cầu gửi kết bạn thành công!");
        setSentRequests((prev) =>
          prev.filter((user) => user.userId !== strangerUserId)
        );
      } else {
        toast.error("Không thể hủy yêu cầu kết bạn! Vui lòng thử lại");
      }
    } catch (error) {
      toast.error("Hệ thống đang bảo trì! Vui lòng thử lại.");
      console.log("Lỗi khi xử lý API deleteFriendRequest: ", error);
    }
  };

  return (
    <>
      {/* loadingSentReuquest */}
      {loadingSentReuquest ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang tải...</p>
        </div>
      ) : (
        <>
          {/* Danh sách đã gửi yêu cầu kết bạn */}
          <div className="w-full overflow-auto box-border bg-white">
            <h1 className="text-2xl font-bold p-10 -mt-4 text-gray-800">
              Danh sách đã gửi yêu cầu kết bạn
            </h1>

            <div className="w-full bg-white">
              {/* Số lượng yêu cầu đã gửi */}
              <p className="text-gray-600 -mt-18 -mb-4 p-10 font-semibold">
                {sentRequests?.length} yêu cầu đã gửi
              </p>

              <div className="w-full h-full box-border bg-white pb-6">
                <div className="w-full bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 px-10 pb-30 gap-4">
                  {/* Danh sách yêu cầu đã gửi */}
                  {sentRequests?.map((friend) => (
                    <FriendCard key={friend.userId} friend={friend}>
                      <Button
                        onClick={() => handleDeleteRequest(friend.userId)}
                      >
                        Hủy yêu cầu kết bạn
                      </Button>
                    </FriendCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-[96%] mx-auto border-b border-gray-300"></div>
        </>
      )}
      {/* loadingSuggest */}
      {loadingSuggest ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang tải...</p>
        </div>
      ) : (
        <>
          {/* Đề xuất bạn bè */}
          <div className="w-full h-full box-border bg-white">
            <h1 className="text-2xl font-bold p-10 pt-6 pb-4 bg-white text-gray-800">
              Những người bạn có thể biết
            </h1>
            <div className="w-full bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 px-10 pb-30 gap-4">
              {suggestions?.map((friend) => (
                <FriendCard key={friend.userId} friend={friend}>
                  <Button onClick={() => handleAddFriend(friend.userId)}>
                    Thêm bạn bè
                  </Button>
                </FriendCard>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SentRequests;
