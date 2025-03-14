import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    birthday: { type: Date, default: null },
    link_social_media: { type: String, default: "" },
    bio: { type: String, default: "" },
    image_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
