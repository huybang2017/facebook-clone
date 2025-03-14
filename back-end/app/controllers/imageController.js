import ImageService from "../services/imageService.js";

class ImageController {
  async getAllImages(req, res) {
    try {
      const images = await ImageService.getAllImages();
      res.json(images);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy danh sách hình ảnh", error });
    }
  }

  async getImageById(req, res) {
    try {
      const image = await ImageService.getImageById(req.params.id);
      if (!image)
        return res.status(404).json({ message: "Không tìm thấy hình ảnh" });
      res.json(image);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi lấy hình ảnh", error });
    }
  }

  async createImage(req, res) {
    try {
      const newImage = await ImageService.createImage(req.body);
      res.status(201).json(newImage);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo hình ảnh", error });
    }
  }

  async updateImage(req, res) {
    try {
      const updatedImage = await ImageService.updateImage(
        req.params.id,
        req.body
      );
      if (!updatedImage)
        return res.status(404).json({ message: "Không tìm thấy hình ảnh" });
      res.json(updatedImage);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật hình ảnh", error });
    }
  }

  async deleteImage(req, res) {
    try {
      const deletedImage = await ImageService.deleteImage(req.params.id);
      if (!deletedImage)
        return res.status(404).json({ message: "Không tìm thấy hình ảnh" });
      res.json({ message: "Xóa hình ảnh thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa hình ảnh", error });
    }
  }
}

export default new ImageController();
