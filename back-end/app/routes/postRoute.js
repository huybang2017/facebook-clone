import express from "express";
import PostController from "../controllers/postController.js";

const router = express.Router();

router.post("/", PostController.createPost);
router.get("/user/:user_id", PostController.getUserPosts);
router.get("/:post_id", PostController.getPostById);
router.put("/:post_id", PostController.updatePost);
router.delete("/:post_id", PostController.deletePost);

export default router;
