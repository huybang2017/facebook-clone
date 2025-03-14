import Image from "../models/Image.js";

class ImageService {
  constructor() {
    this.model = Image;
  }

  async getAllImages() {
    return await this.model.find();
  }

  async getImageById(id) {
    return await this.model.findById(id);
  }

  async createImage(imageData) {
    const image = new this.model(imageData);
    return await image.save();
  }

  async updateImage(id, updateData) {
    return await this.model.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteImage(id) {
    return await this.model.findByIdAndDelete(id);
  }
}

export default new ImageService();
