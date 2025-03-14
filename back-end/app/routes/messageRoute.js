import express from "express";
import MessageController from "../controllers/messageController.js";

const router = express.Router();

router.post("/", MessageController.sendMessage);
router.get("/:user1_id/:user2_id", MessageController.getMessages);
router.put("/:message_id/read", MessageController.markAsRead);
router.delete("/:message_id", MessageController.deleteMessage);

export default router;
