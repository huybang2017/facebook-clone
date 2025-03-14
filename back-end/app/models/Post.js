import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    caption: { type: String, default: "" },
    status_post: {
      type: String,
      enum: ["active", "delete"],
      default: "active",
    },
    status_show: {
      type: String,
      enum: ["alone", "friends", "public"],
      default: "public",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    hastag_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hastag" }],
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
