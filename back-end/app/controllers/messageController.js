import MessageService from "../services/messageService.js";

class MessageController {
  async sendMessage(req, res) {
    try {
      const { sender_id, receiver_id, content } = req.body;
      if (!sender_id || !receiver_id || !content) {
        return res.status(400).json({ message: "Thiếu thông tin tin nhắn" });
      }

      const message = await MessageService.sendMessage(
        sender_id,
        receiver_id,
        content
      );
      res.status(201).json(message);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi gửi tin nhắn", error: error.message });
    }
  }

  async getMessages(req, res) {
    try {
      const { user1_id, user2_id } = req.params;
      const messages = await MessageService.getMessagesBetweenUsers(
        user1_id,
        user2_id
      );
      res.json(messages);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy tin nhắn", error: error.message });
    }
  }

  async markAsRead(req, res) {
    try {
      const { message_id } = req.params;
      const updatedMessage = await MessageService.markAsRead(message_id);
      res.json(updatedMessage);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Lỗi khi cập nhật trạng thái tin nhắn",
          error: error.message,
        });
    }
  }

  async deleteMessage(req, res) {
    try {
      const { message_id } = req.params;
      await MessageService.deleteMessage(message_id);
      res.json({ message: "Tin nhắn đã được xóa" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi xóa tin nhắn", error: error.message });
    }
  }
}

export default new MessageController();
