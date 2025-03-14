import express from "express";
import CommentController from "../controllers/commentController.js";

const router = express.Router();

router.get("/", CommentController.getAllComments);
router.get("/:id", CommentController.getCommentById);
router.post("/", CommentController.createComment);
router.put("/:id", CommentController.updateComment);
router.delete("/:id", CommentController.deleteComment);

export default router;
