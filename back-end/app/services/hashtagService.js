import Hashtag from "../models/Hashtag.js";

class HashtagService {
  async getAllHashtags() {
    return await Hashtag.find();
  }

  async getHashtagById(id) {
    return await Hashtag.findById(id);
  }

  async createHashtag(content) {
    const existingHashtag = await Hashtag.findOne({ content });
    if (existingHashtag) {
      throw new Error("Hashtag đã tồn tại");
    }
    const newHashtag = new Hashtag({ content });
    return await newHashtag.save();
  }

  async updateHashtag(id, content) {
    const hashtag = await Hashtag.findById(id);
    if (!hashtag) {
      throw new Error("Hashtag không tồn tại");
    }
    hashtag.content = content;
    hashtag.updated_at = Date.now();
    return await hashtag.save();
  }

  async deleteHashtag(id) {
    const deletedHashtag = await Hashtag.findByIdAndDelete(id);
    if (!deletedHashtag) {
      throw new Error("Hashtag không tồn tại");
    }
    return deletedHashtag;
  }
}

export default new HashtagService();
