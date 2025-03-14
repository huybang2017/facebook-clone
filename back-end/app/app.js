import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoute from "./routes/userRotue.js";
import imageRoute from "./routes/imageRoute.js";
import commentRoute from "./routes/commentRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import groupChatRoute from "./routes/groupchatRoute.js";
import groupChatMemberRoute from "./routes/groupchatmemberRoute.js";
import hashtagRoute from "./routes/hashtagRoute.js";
import likeRoute from "./routes/likeRoute.js";
import messageRoute from "./routes/messageRoute.js";
import postRoute from "./routes/postRoute.js";
import shareRoute from "./routes/shareRoute.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/image", imageRoute);
app.use("/api/comments", commentRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/group-chats", groupChatRoute);
app.use("/api/group-chat-members", groupChatMemberRoute);
app.use("/api/hashtags", hashtagRoute);
app.use("/api/likes", likeRoute);
app.use("/api/messages", messageRoute);
app.use("/api/posts", postRoute);
app.use("/api/shares", shareRoute);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
