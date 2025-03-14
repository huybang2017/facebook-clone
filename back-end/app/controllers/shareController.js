import ShareService from "../services/shareService.js";

class ShareController {
  async sharePost(req, res) {
    try {
      const { user_id, post_id } = req.body;
      if (!user_id || !post_id) {
        return res
          .status(400)
          .json({ message: "Thiếu thông tin user hoặc bài viết" });
      }

      const share = await ShareService.sharePost(user_id, post_id);
      res.status(201).json(share);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi chia sẻ bài viết", error: error.message });
    }
  }

  async getUserShares(req, res) {
    try {
      const { user_id } = req.params;
      const shares = await ShareService.getSharesByUser(user_id);
      res.json(shares);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Lỗi khi lấy danh sách bài viết đã chia sẻ",
          error: error.message,
        });
    }
  }

  async getPostShares(req, res) {
    try {
      const { post_id } = req.params;
      const shares = await ShareService.getSharesByPost(post_id);
      res.json(shares);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Lỗi khi lấy danh sách người chia sẻ",
          error: error.message,
        });
    }
  }

  async deleteShare(req, res) {
    try {
      const { share_id } = req.params;
      await ShareService.deleteShare(share_id);
      res.json({ message: "Chia sẻ đã bị xóa" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi xóa chia sẻ", error: error.message });
    }
  }
}

export default new ShareController();
