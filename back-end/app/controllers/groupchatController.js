import GroupChatService from "../services/groupchatService.js";

class GroupChatController {
  async getAllGroupChats(req, res) {
    try {
      const groupChats = await GroupChatService.getAllGroupChats();
      res.json(groupChats);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy danh sách nhóm chat", error });
    }
  }

  async getGroupChatById(req, res) {
    try {
      const groupChat = await GroupChatService.getGroupChatById(req.params.id);
      if (!groupChat)
        return res.status(404).json({ message: "Không tìm thấy nhóm chat" });

      res.json(groupChat);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy thông tin nhóm chat", error });
    }
  }

  async createGroupChat(req, res) {
    try {
      const { name, created_by } = req.body;
      if (!name || !created_by) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập đầy đủ thông tin" });
      }

      const groupChat = await GroupChatService.createGroupChat({
        name,
        created_by,
      });

      res.status(201).json(groupChat);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo nhóm chat", error });
    }
  }

  async updateGroupChat(req, res) {
    try {
      const updatedGroupChat = await GroupChatService.updateGroupChat(
        req.params.id,
        req.body
      );
      if (!updatedGroupChat)
        return res.status(404).json({ message: "Không tìm thấy nhóm chat" });

      res.json(updatedGroupChat);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật nhóm chat", error });
    }
  }

  async deleteGroupChat(req, res) {
    try {
      const deletedGroupChat = await GroupChatService.deleteGroupChat(
        req.params.id
      );
      if (!deletedGroupChat)
        return res.status(404).json({ message: "Không tìm thấy nhóm chat" });

      res.json({ message: "Xóa nhóm chat thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa nhóm chat", error });
    }
  }
}

export default new GroupChatController();
