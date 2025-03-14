import express from "express";
import GroupChatController from "../controllers/groupchatController.js";

const router = express.Router();

router.get("/", GroupChatController.getAllGroupChats);
router.get("/:id", GroupChatController.getGroupChatById);
router.post("/", GroupChatController.createGroupChat);
router.put("/:id", GroupChatController.updateGroupChat);
router.delete("/:id", GroupChatController.deleteGroupChat);

export default router;
