import Message from "../models/Message.js";

class MessageService {
  async sendMessage(sender_id, receiver_id, content) {
    const message = new Message({ sender_id, receiver_id, content });
    return await message.save();
  }

  async getMessagesBetweenUsers(user1_id, user2_id) {
    return await Message.find({
      $or: [
        { sender_id: user1_id, receiver_id: user2_id },
        { sender_id: user2_id, receiver_id: user1_id },
      ],
    })
      .sort({ createdAt: 1 }) // Sắp xếp tin nhắn theo thời gian
      .populate("sender_id receiver_id");
  }

  async markAsRead(message_id) {
    return await Message.findByIdAndUpdate(
      message_id,
      { status: "read" },
      { new: true }
    );
  }

  async deleteMessage(message_id) {
    return await Message.findByIdAndDelete(message_id);
  }
}

export default new MessageService();
