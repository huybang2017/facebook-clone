import {
  unfriend,
  acceptFriendRequest,
  deleteFriendRequest,
  addFriendRequest,
} from "@/apis/friendService";

// Thêm bạn bè
export const AddFriend = async ({
  friendId,
  setSentRequests = () => {},
  suggestions = [],
  setSuggestions = () => {},
  toast = { success: () => {}, error: () => {} },
}) => {
  try {
    const res = await addFriendRequest(friendId);

    if (res?.status === 200) {
      toast.success("Đã gửi yêu cầu kết bạn thành công!");

      const addedUser = suggestions.find((user) => user.userId === friendId);
      setSuggestions((prev) => prev.filter((user) => user.userId !== friendId));

      if (addedUser) {
        setSentRequests((prev) => [...prev, addedUser]);
      }
    } else {
      toast.error("Không thể gửi yêu cầu kết bạn!");
    }
  } catch (error) {
    toast.error("Lỗi khi gửi yêu cầu kết bạn!");
    console.log(error);
  }
};

// Hủy bạn bè
export const UnFriend = async ({
  userId,
  friendId,
  updateData = () => {},
  toast = { success: () => {}, error: () => {} },
}) => {
  try {
    const res = await unfriend(userId, friendId);
    if (res?.status === 200) {
      toast.success("Đã hủy kết bạn thành công!");
      updateData(friendId);
    } else {
      toast.error("Không thể hủy kết bạn. Vui lòng thử lại!");
    }
  } catch (error) {
    toast.error("Lỗi khi hủy kết bạn!");
    console.log(error);
  }
};

// Hủy yêu cầu kết bạn
export const DeleteRequest = async ({
  userId,
  friendId,
  updateData = () => {},
  toast = { success: () => {}, error: () => {} },
}) => {
  try {
    const res = await deleteFriendRequest(userId, friendId);

    if (res?.status === 200) {
      toast.success("Đã hủy yêu cầu gửi kết bạn thành công!");
      updateData(friendId);
    } else {
      toast.error("Không thể hủy yêu cầu kết bạn! Vui lòng thử lại");
    }
  } catch (error) {
    toast.error("Lỗi khi hủy yêu cầu kết bạn!");
    console.log(error);
  }
};

// Chấp nhận lời mời kết bạn
export const AcceptFriend = async ({
  friendId,
  updateData = () => {},
  toast = { success: () => {}, error: () => {} },
}) => {
  try {
    const res = await acceptFriendRequest(friendId);
    if (res?.status === 200) {
      toast.success("Kết bạn thành công!");
      updateData(friendId);
    } else {
      toast.error("Không thể chấp nhận lời mời kết bạn!");
    }
  } catch (error) {
    toast.error("Lỗi khi chấp nhận kết bạn!");
    console.log(error);
  }
};

// Từ chối lời mời kết bạn
export const RejectFriend = async ({
  userId,
  friendId,
  updateData = () => {},
  toast = { success: () => {}, error: () => {} },
}) => {
  try {
    const res = await deleteFriendRequest(userId, friendId);

    if (res?.status === 200) {
      toast.success("Từ chối lời mời kết bạn thành công!");
      updateData(friendId);
    } else {
      toast.error("Không thể từ chối lời mời kết bạn!");
    }
  } catch (error) {
    toast.error("Lỗi khi từ chối kết bạn!");
    console.log(error);
  }
};
