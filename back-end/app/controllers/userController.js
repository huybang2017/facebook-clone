import UserService from "../services/userService.js";

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy danh sách người dùng", error });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user)
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Lỗi khi lấy thông tin người dùng", error });
    }
  }

  async createUser(req, res) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi tạo người dùng", error });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      if (!updatedUser)
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi cập nhật người dùng", error });
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await UserService.deleteUser(req.params.id);
      if (!deletedUser)
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      res.json({ message: "Xóa người dùng thành công" });
    } catch (error) {
      res.status(500).json({ message: "Lỗi khi xóa người dùng", error });
    }
  }
}

export default new UserController();
