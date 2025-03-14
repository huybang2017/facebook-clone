import Like from "../models/Like.js";

class LikeService {
  async getAllLikes() {
    return await Like.find().populate("user_id post_id");
  }

  async getLikesByPost(post_id) {
    return await Like.find({ post_id }).populate("user_id");
  }

  async addLike(user_id, post_id) {
    const existingLike = await Like.findOne({ user_id, post_id });
    if (existingLike) {
      throw new Error("Bạn đã thích bài viết này");
    }
    const newLike = new Like({ user_id, post_id });
    return await newLike.save();
  }

  async removeLike(user_id, post_id) {
    const deletedLike = await Like.findOneAndDelete({ user_id, post_id });
    if (!deletedLike) {
      throw new Error("Bạn chưa thích bài viết này");
    }
    return deletedLike;
  }

  async countLikes(post_id) {
    return await Like.countDocuments({ post_id });
  }
}

export default new LikeService();
