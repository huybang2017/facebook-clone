/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import axiosClient from "@/apis/axiosClient";
import { getAllFriends, deleteFriend } from "@/apis/friendService";
import FriendCard from "@/components/Friend/FriendCard";
import Button from "@/components/Button/Button";
import { ToastContext } from "@/contexts/ToastProvider";

const ListFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useContext(ToastContext);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const res = await getAllFriends();
        if (res && res.data && res.data.data) {
          setFriends(res.data.data);
        } else {
          setFriends([]);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Không thể tải danh sách bạn bè từ server!");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFriends();
  }, []);

  const handleRemoveFriend = async (friendId) => {
    try {
      const res = await deleteFriend(friendId);
      if (res && res.data && res.data.success) {
        setFriends((prevFriends) =>
          prevFriends.filter((friend) => friend.id !== friendId)
        );
        toast.success("Đã hủy kết bạn thành công!");
      } else {
        toast.error("Không thể hủy kết bạn!");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Không thể hủy kết bạn từ server!");
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
                <FriendCard friend={friend}>
                  <Button onClick={() => handleRemoveFriend(friend.id)}>
                    Hủy kết bạn
                  </Button>
                </FriendCard>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListFriends;
