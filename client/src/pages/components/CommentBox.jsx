import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CommentBox({ comments, onCommentSubmit }) {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onCommentSubmit(comment);
      setComment(""); // Xóa input sau khi gửi
    }
  };

  return (
    <div className="border-t border-gray-200 mt-3">
      {/* Danh sách bình luận */}
      <div className="max-h-40 overflow-y-auto p-2">
        {comments.map((cmt, index) => (
          <div key={index} className="flex items-start gap-2 mb-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={cmt.userAvatar} alt={cmt.username} />
              <AvatarFallback>{cmt.username[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">
                <span className="font-semibold">{cmt.username}</span> {cmt.text}
              </p>
              <p className="text-xs text-gray-500">{cmt.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Form nhập bình luận */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2">
        <Input
          type="text"
          placeholder="Viết bình luận..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 border-none focus:ring-0"
        />
        <Button type="submit" variant="ghost" size="icon">
          <Send className="w-5 h-5 text-blue-500" />
        </Button>
      </form>
    </div>
  );
}
