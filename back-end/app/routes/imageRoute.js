import express from "express";
import ImageController from "../controllers/imageController.js";

const router = express.Router();

router.get("/", ImageController.getAllImages);
router.get("/:id", ImageController.getImageById);
router.post("/", ImageController.createImage);
router.put("/:id", ImageController.updateImage);
router.delete("/:id", ImageController.deleteImage);

export default router;
