import Post from "../models/Post.js";

class PostService {
  async createPost(
    user_id,
    caption,
    status_show,
    image_id = [],
    hastag_id = []
  ) {
    const post = new Post({
      user_id,
      caption,
      status_show,
      image_id,
      hastag_id,
    });
    return await post.save();
  }

  async getPostsByUser(user_id) {
    return await Post.find({ user_id, status_post: "active" })
      .populate("user_id image_id hastag_id")
      .sort({ createdAt: -1 });
  }

  async getPostById(post_id) {
    return await Post.findById(post_id).populate("user_id image_id hastag_id");
  }

  async updatePost(post_id, updates) {
    return await Post.findByIdAndUpdate(post_id, updates, { new: true });
  }

  async deletePost(post_id) {
    return await Post.findByIdAndUpdate(
      post_id,
      { status_post: "delete" },
      { new: true }
    );
  }
}

export default new PostService();
