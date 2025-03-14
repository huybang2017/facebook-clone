import express from "express";
import LikeController from "../controllers/likeController.js";

const router = express.Router();

router.get("/", LikeController.getAll);
router.get("/:post_id", LikeController.getByPost);
router.post("/", LikeController.likePost);
router.delete("/", LikeController.unlikePost);
router.get("/count/:post_id", LikeController.countLikes);

export default router;
