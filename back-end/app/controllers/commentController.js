import CommentService from "../services/commentService.js";

class CommentController {
  async getAllComments(req, res) {
    try {
      const comments = await CommentService.getAllComments();
      res.json(comments);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy danh sách bình luận", error });
    }
  }

  async getCommentById(req, res) {
    try {
      const comment = await CommentService.getCommentById(req.params.id);
      if (!comment)
        return res.status(404).json({ message: "Không tìm thấy bình luận" });

      res.json(comment);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy thông tin bình luận", error });
    }
  }

  async createComment(req, res) {
    try {
      const { description, user_id, post_id } = req.body;
      if (!description || !user_id || !post_id) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập đầy đủ thông tin" });
      }

      const comment = await CommentService.createComment({
        description,
        user_id,
        post_id,
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo bình luận", error });
    }
  }

  async updateComment(req, res) {
    try {
      const updatedComment = await CommentService.updateComment(
        req.params.id,
        req.body
      );
      if (!updatedComment)
        return res.status(404).json({ message: "Không tìm thấy bình luận" });

      res.json(updatedComment);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật bình luận", error });
    }
  }

  async deleteComment(req, res) {
    try {
      const deletedComment = await CommentService.deleteComment(req.params.id);
      if (!deletedComment)
        return res.status(404).json({ message: "Không tìm thấy bình luận" });

      res.json({ message: "Xóa bình luận thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa bình luận", error });
    }
  }
}

export default new CommentController();
