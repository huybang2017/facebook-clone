import Share from "../models/Share.js";

class ShareService {
  async sharePost(user_id, post_id) {
    const share = new Share({ user_id, post_id });
    return await share.save();
  }

  async getSharesByUser(user_id) {
    return await Share.find({ user_id })
      .populate("user_id post_id")
      .sort({ createdAt: -1 });
  }

  async getSharesByPost(post_id) {
    return await Share.find({ post_id })
      .populate("user_id post_id")
      .sort({ createdAt: -1 });
  }

  async deleteShare(share_id) {
    return await Share.findByIdAndDelete(share_id);
  }
}

export default new ShareService();
