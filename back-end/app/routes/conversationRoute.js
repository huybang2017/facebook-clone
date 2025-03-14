import express from "express";
import ConversationController from "../controllers/conversationController.js";

const router = express.Router();

router.get("/", ConversationController.getAllConversations);
router.get("/:id", ConversationController.getConversationById);
router.post("/", ConversationController.createConversation);
router.put("/:id", ConversationController.updateConversation);
router.delete("/:id", ConversationController.deleteConversation);

export default router;
