import React, { useState, useEffect, useContext } from "react";
import FriendCard from "@/components/Friend/FriendCard";
import Button from "@/components/Button/Button";
import { ToastContext } from "@/contexts/ToastProvider";
import { getUserFriends } from "@/apis/friendService";
import { StoreContext } from "@/contexts/StoreProvider";
import { UnFriend } from "@/utils/FriendHelper";
const Friends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useContext(ToastContext);
  const { userInfo } = useContext(StoreContext);

  useEffect(() => {
    const fetchFriends = async () => {
      if (userInfo) {
        try {
          setLoading(true);
          const res = await getUserFriends(userInfo.data.userId);
          setFriends(res?.data?.userList || []);
        } catch (error) {
          toast.error("Hệ thống đang bảo trì. Vui lòng thử lại!");
          console.log("Lỗi khi xử lý API fetchFriends: ", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchFriends();
  }, [userInfo, toast]);

  const handleUnFriend = (friendId) => {
    UnFriend({
      userId: userInfo.data.userId,
      friendId: friendId,
      updateData: (removedId) => {
        setFriends((prev) => prev.filter((f) => f.userId !== removedId));
      },
      toast: toast,
    });
  };

  return (
    <>
      {/* Loading*/}
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang tải danh sách bạn bè...</p>
        </div>
      ) : (
        <>
          <div className="w-full h-full overflow-auto box-border bg-white">
            {/* Header */}
            <h1 className="text-2xl font-bold p-10 -mt-4 text-gray-800">
              Danh sách bạn bè
            </h1>
            {/* Số lượng bạn bè */}
            <p className="text-gray-600 -mt-18 -mb-4 p-10 font-semibold">
              {friends?.length} người bạn
            </p>

            {/* List Friend */}
            <div className="w-full bg-white grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 px-10 pb-30 gap-4">
              {friends?.map((friend) => {
                return (
                  <FriendCard key={friend.userId} friend={friend}>
                    <Button onClick={() => handleUnFriend(friend.userId)}>
                      Hủy kết bạn
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

export default Friends;
