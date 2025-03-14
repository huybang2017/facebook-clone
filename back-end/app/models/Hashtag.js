import mongoose from "mongoose";

const hastagSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Hastag", hastagSchema);
