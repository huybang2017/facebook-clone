import mongoose from "mongoose";

const groupChatMemberSchema = new mongoose.Schema({
  group_chat_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GroupChat",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  joined_at: { type: Date, default: Date.now },
});

export default mongoose.model("GroupChatMember", groupChatMemberSchema);
