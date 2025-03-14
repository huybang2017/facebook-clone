import express from "express";
import GroupChatMemberController from "../controllers/groupchatmemberController.js";

const router = express.Router();

router.get("/:groupChatId/members", GroupChatMemberController.getMembers);
router.post("/:groupChatId/members", GroupChatMemberController.addMember);
router.delete("/:groupChatId/members", GroupChatMemberController.removeMember);

export default router;
