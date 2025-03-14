import express from "express";
import ShareController from "../controllers/shareController.js";

const router = express.Router();

router.post("/", ShareController.sharePost);
router.get("/user/:user_id", ShareController.getUserShares);
router.get("/post/:post_id", ShareController.getPostShares);
router.delete("/:share_id", ShareController.deleteShare);

export default router;
