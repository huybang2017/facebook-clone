import ConversationService from "../services/conversationService.js";

class ConversationController {
  async getAllConversations(req, res) {
    try {
      const conversations = await ConversationService.getAllConversations();
      res.json(conversations);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy danh sách hội thoại", error });
    }
  }

  async getConversationById(req, res) {
    try {
      const conversation = await ConversationService.getConversationById(
        req.params.id
      );
      if (!conversation)
        return res.status(404).json({ message: "Không tìm thấy hội thoại" });

      res.json(conversation);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy thông tin hội thoại", error });
    }
  }

  async createConversation(req, res) {
    try {
      const { user_1_id, user_2_id, last_message_id } = req.body;
      if (!user_1_id || !user_2_id) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập đầy đủ thông tin" });
      }

      const conversation = await ConversationService.createConversation({
        user_1_id,
        user_2_id,
        last_message_id: last_message_id || null,
      });

      res.status(201).json(conversation);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo hội thoại", error });
    }
  }

  async updateConversation(req, res) {
    try {
      const updatedConversation = await ConversationService.updateConversation(
        req.params.id,
        req.body
      );
      if (!updatedConversation)
        return res.status(404).json({ message: "Không tìm thấy hội thoại" });

      res.json(updatedConversation);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật hội thoại", error });
    }
  }

  async deleteConversation(req, res) {
    try {
      const deletedConversation = await ConversationService.deleteConversation(
        req.params.id
      );
      if (!deletedConversation)
        return res.status(404).json({ message: "Không tìm thấy hội thoại" });

      res.json({ message: "Xóa hội thoại thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa hội thoại", error });
    }
  }
}

export default new ConversationController();
