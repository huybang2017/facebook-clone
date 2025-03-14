import Conversation from "../models/Conversation.js";

class ConversationService {
  async getAllConversations() {
    return await Conversation.find()
      .populate("user_1_id")
      .populate("user_2_id")
      .populate("last_message_id");
  }

  async getConversationById(id) {
    return await Conversation.findById(id)
      .populate("user_1_id")
      .populate("user_2_id")
      .populate("last_message_id");
  }

  async createConversation(data) {
    const conversation = new Conversation(data);
    return await conversation.save();
  }

  async updateConversation(id, updateData) {
    return await Conversation.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteConversation(id) {
    return await Conversation.findByIdAndDelete(id);
  }
}

export default new ConversationService();
