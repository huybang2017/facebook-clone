import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    image: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Image", imageSchema);
