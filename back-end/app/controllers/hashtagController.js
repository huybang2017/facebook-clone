import HashtagService from "../services/hashtagService.js";

class HashtagController {
  async getAll(req, res) {
    try {
      const hashtags = await HashtagService.getAllHashtags();
      res.json(hashtags);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy hashtags", error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const hashtag = await HashtagService.getHashtagById(req.params.id);
      if (!hashtag)
        return res.status(404).json({ message: "Hashtag không tồn tại" });
      res.json(hashtag);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy hashtag", error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { content } = req.body;
      if (!content)
        return res
          .status(400)
          .json({ message: "Nội dung hashtag không được để trống" });

      const newHashtag = await HashtagService.createHashtag(content);
      res.status(201).json(newHashtag);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi tạo hashtag", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { content } = req.body;
      if (!content)
        return res
          .status(400)
          .json({ message: "Nội dung hashtag không được để trống" });

      const updatedHashtag = await HashtagService.updateHashtag(
        req.params.id,
        content
      );
      res.json(updatedHashtag);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi cập nhật hashtag", error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await HashtagService.deleteHashtag(req.params.id);
      res.json({ message: "Xóa hashtag thành công" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi xóa hashtag", error: error.message });
    }
  }
}

export default new HashtagController();
