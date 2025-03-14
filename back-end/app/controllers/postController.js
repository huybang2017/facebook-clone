import PostService from "../services/postService.js";

class PostController {
  async createPost(req, res) {
    try {
      const { user_id, caption, status_show, image_id, hastag_id } = req.body;
      if (!user_id)
        return res.status(400).json({ message: "Thiếu thông tin user" });

      const post = await PostService.createPost(
        user_id,
        caption,
        status_show,
        image_id,
        hastag_id
      );
      res.status(201).json(post);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi tạo bài viết", error: error.message });
    }
  }

  async getUserPosts(req, res) {
    try {
      const { user_id } = req.params;
      const posts = await PostService.getPostsByUser(user_id);
      res.json(posts);
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Lỗi khi lấy danh sách bài viết",
          error: error.message,
        });
    }
  }

  async getPostById(req, res) {
    try {
      const { post_id } = req.params;
      const post = await PostService.getPostById(post_id);
      if (!post)
        return res.status(404).json({ message: "Bài viết không tồn tại" });
      res.json(post);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy bài viết", error: error.message });
    }
  }

  async updatePost(req, res) {
    try {
      const { post_id } = req.params;
      const updates = req.body;
      const updatedPost = await PostService.updatePost(post_id, updates);
      res.json(updatedPost);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi cập nhật bài viết", error: error.message });
    }
  }

  async deletePost(req, res) {
    try {
      const { post_id } = req.params;
      await PostService.deletePost(post_id);
      res.json({ message: "Bài viết đã được xóa" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi xóa bài viết", error: error.message });
    }
  }
}

export default new PostController();
