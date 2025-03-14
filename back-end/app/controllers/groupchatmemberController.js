import GroupChatMemberService from "../services/groupchatmemberService.js";

class GroupChatMemberController {
  async getMembers(req, res) {
    try {
      const members = await GroupChatMemberService.getMembersByGroupChat(
        req.params.groupChatId
      );
      res.json(members);
    } catch (error) {
      res.status(500).json({
        message: "Lỗi khi lấy danh sách thành viên",
        error: error.message,
      });
    }
  }

  async addMember(req, res) {
    try {
      const { user_id } = req.body;
      if (!user_id) {
        return res.status(400).json({ message: "Vui lòng cung cấp user_id" });
      }

      const newMember = await GroupChatMemberService.addMemberToGroupChat(
        req.params.groupChatId,
        user_id
      );
      res.status(201).json(newMember);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi thêm thành viên", error: error.message });
    }
  }

  async removeMember(req, res) {
    try {
      const { user_id } = req.body;
      if (!user_id) {
        return res.status(400).json({ message: "Vui lòng cung cấp user_id" });
      }

      const removedMember =
        await GroupChatMemberService.removeMemberFromGroupChat(
          req.params.groupChatId,
          user_id
        );
      res.json({ message: "Xóa thành viên thành công", removedMember });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi xóa thành viên", error: error.message });
    }
  }
}

export default new GroupChatMemberController();
