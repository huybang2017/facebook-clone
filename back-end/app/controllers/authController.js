import AuthService from "../services/authService.js";
import userService from "../services/userService.js";

class AuthController {
  async register(req, res) {
    try {
      const userData = req.body;
      const { user, accessToken, refreshToken } = await AuthService.register(
        userData
      );
      res.status(201).json({ user, accessToken, refreshToken });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.login(
        email,
        password
      );
      res.status(200).json({ user, accessToken, refreshToken });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async verifyToken(req, res) {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = AuthService.verifyAccessToken(token);
      const user = await userService.getUserById(decoded.id);
      res.status(200).json({ user });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token is required" });
      }

      const decoded = AuthService.verifyRefreshToken(refreshToken);
      const newAccessToken = AuthService.generateAccessToken(decoded.id);

      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(403).json({ message: error.message });
    }
  }
}

export default new AuthController();
