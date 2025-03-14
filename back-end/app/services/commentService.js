import Comment from "../models/Comment.js";

class CommentService {
  async getAllComments() {
    return await Comment.find().populate("user_id").populate("post_id");
  }

  async getCommentById(id) {
    return await Comment.findById(id).populate("user_id").populate("post_id");
  }

  async createComment(commentData) {
    const comment = new Comment(commentData);
    return await comment.save();
  }

  async updateComment(id, updateData) {
    return await Comment.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteComment(id) {
    return await Comment.findByIdAndDelete(id);
  }
}

export default new CommentService();
