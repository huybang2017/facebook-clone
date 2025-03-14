import User from "../models/User.js";

class UserService {
  async getAllUsers() {
    return await User.find().populate("image_id");
  }

  async getUserById(id) {
    return await User.findById(id).populate("image_id");
  }

  async createUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async updateUser(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserService();
