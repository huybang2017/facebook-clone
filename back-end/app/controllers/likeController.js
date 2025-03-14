import LikeService from "../services/likeService.js";

class LikeController {
  async getAll(req, res) {
    try {
      const likes = await LikeService.getAllLikes();
      res.json(likes);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy danh sách likes", error: error.message });
    }
  }

  async getByPost(req, res) {
    try {
      const likes = await LikeService.getLikesByPost(req.params.post_id);
      res.json(likes);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Lỗi khi lấy likes của bài viết",
          error: error.message,
        });
    }
  }

  async likePost(req, res) {
    try {
      const { user_id, post_id } = req.body;
      if (!user_id || !post_id)
        return res
          .status(400)
          .json({ message: "Thiếu thông tin user_id hoặc post_id" });

      const newLike = await LikeService.addLike(user_id, post_id);
      res.status(201).json(newLike);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi like bài viết", error: error.message });
    }
  }

  async unlikePost(req, res) {
    try {
      const { user_id, post_id } = req.body;
      if (!user_id || !post_id)
        return res
          .status(400)
          .json({ message: "Thiếu thông tin user_id hoặc post_id" });

      await LikeService.removeLike(user_id, post_id);
      res.json({ message: "Bỏ thích thành công" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi bỏ like bài viết", error: error.message });
    }
  }

  async countLikes(req, res) {
    try {
      const likeCount = await LikeService.countLikes(req.params.post_id);
      res.json({ post_id: req.params.post_id, like_count: likeCount });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi đếm số lượt like", error: error.message });
    }
  }
}

export default new LikeController();
