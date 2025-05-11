import React, { useEffect, useState, useContext } from "react";
import { ToastContext } from "@/contexts/ToastProvider";
import { StoreContext } from "@/contexts/StoreProvider";
import { getReceivedFriendRequests } from "@/apis/friendService";
import FriendCard from "@/components/Friend/FriendCard";
import Button from "@/components/Button/Button";
import { AcceptFriend, RejectFriend } from "@/utils/FriendHelper";

const ReceivedRequests = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useContext(ToastContext);
  const { userInfo } = useContext(StoreContext);

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      if (userInfo) {
        try {
          setLoading(true);
          const res = await getReceivedFriendRequests(userInfo.data.userId);
          setReceivedRequests(res?.data.userList || []);
        } catch (error) {
          toast.error("Hệ thống đang bảo trì. Vui lòng thử lại!");
          console.log("Lỗi khi xử lý API getReceivedFriendRequests: ", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchReceivedRequests();
  }, [userInfo, toast]);

  // Xử lý chấp nhận lời mời kết bạn
  const handleAcceptFriend = async (friendId) => {
    AcceptFriend(
      friendId,
      (acceptId) => {
        setReceivedRequests((prev) =>
          prev.filter((request) => request.userId !== acceptId)
        );
      },
      toast
    );
  };

  // Xử lý từ chối lời mời kết bạn
  const handleRejectFriend = async (friendId) => {
    RejectFriend(userInfo.data.userId, friendId, (rejectId) => {
      setReceivedRequests((prev) =>
        prev.filter((request) => request.userId !== rejectId)
      );
    });
  };

  return (
    <>
      {/* Loading */}
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang tải...</p>
        </div>
      ) : (
        <>
          <div className="w-full h-full box-border bg-white">
            {/* Header */}
            <h1 className="text-2xl font-bold p-10 -mt-4 text-gray-800">
              Danh sách lời mời kết bạn
            </h1>
            {/* Số lượng lời mời */}
            <p className="text-gray-600 -mt-18 -mb-4 p-10 font-semibold">
              {receivedRequests?.length} lời mời kết bạn
            </p>

            {/* List ReceivedRequests */}
            <div className="w-full bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 px-10 pb-30 gap-4">
              {receivedRequests?.map((friend) => {
                return (
                  <FriendCard key={friend.userId} friend={friend}>
                    <Button onClick={() => handleAcceptFriend(friend.userId)}>
                      Chấp nhận
                    </Button>
                    <Button
                      className="bg-gray-300 hover:bg-gray-400 !text-black"
                      onClick={() => handleRejectFriend(friend.userId)}
                    >
                      Từ chối
                    </Button>
                  </FriendCard>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ReceivedRequests;
