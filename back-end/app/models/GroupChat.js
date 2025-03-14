import mongoose from "mongoose";

const groupChatSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("GroupChat", groupChatSchema);
