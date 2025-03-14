import GroupChat from "../models/GroupChat.js";

class GroupChatService {
  async getAllGroupChats() {
    return await GroupChat.find().populate("created_by");
  }

  async getGroupChatById(id) {
    return await GroupChat.findById(id).populate("created_by");
  }

  async createGroupChat(data) {
    const groupChat = new GroupChat(data);
    return await groupChat.save();
  }

  async updateGroupChat(id, updateData) {
    return await GroupChat.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteGroupChat(id) {
    return await GroupChat.findByIdAndDelete(id);
  }
}

export default new GroupChatService();
