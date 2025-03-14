import express from "express";
import HashtagController from "../controllers/hashtagController.js";

const router = express.Router();

router.get("/", HashtagController.getAll);
router.get("/:id", HashtagController.getById);
router.post("/", HashtagController.create);
router.put("/:id", HashtagController.update);
router.delete("/:id", HashtagController.delete);

export default router;
