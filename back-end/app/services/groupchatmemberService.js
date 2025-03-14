import GroupChatMember from "../models/GroupChatMember.js";
import GroupChat from "../models/GroupChat.js";
import User from "../models/User.js";

class GroupChatMemberService {
  async getMembersByGroupChat(groupChatId) {
    return await GroupChatMember.find({ group_chat_id: groupChatId }).populate(
      "user_id"
    );
  }

  async addMemberToGroupChat(groupChatId, userId) {
    const groupChat = await GroupChat.findById(groupChatId);
    if (!groupChat) {
      throw new Error("Nhóm chat không tồn tại");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Người dùng không tồn tại");
    }

    const existingMember = await GroupChatMember.findOne({
      group_chat_id: groupChatId,
      user_id: userId,
    });
    if (existingMember) {
      throw new Error("Người dùng đã có trong nhóm chat");
    }

    const newMember = new GroupChatMember({
      group_chat_id: groupChatId,
      user_id: userId,
    });
    return await newMember.save();
  }

  async removeMemberFromGroupChat(groupChatId, userId) {
    const deletedMember = await GroupChatMember.findOneAndDelete({
      group_chat_id: groupChatId,
      user_id: userId,
    });
    if (!deletedMember) {
      throw new Error("Người dùng không tồn tại trong nhóm chat");
    }
    return deletedMember;
  }
}

export default new GroupChatMemberService();
