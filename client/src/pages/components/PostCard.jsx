import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function PostCard({ post }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.userAvatar} alt={post.username} />
            <AvatarFallback>{post.username.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="font-semibold">{post.username}</span>
        </div>
        <Button variant="ghost" size="sm">
          ⋮
        </Button>
      </div>

      {/* Image */}
      <img
        src={post.image}
        alt="Post"
        className="w-full h-72 object-cover rounded-lg"
      />

      {/* Actions */}
      <div className="flex justify-between items-center my-2">
        <div className="flex space-x-4">
          <Button variant="ghost">
            <Heart className="w-6 h-6 text-gray-700 hover:text-red-500" />
          </Button>
          <Button variant="ghost">
            <MessageCircle className="w-6 h-6 text-gray-700 hover:text-blue-500" />
          </Button>
          <Button variant="ghost">
            <Send className="w-6 h-6 text-gray-700 hover:text-green-500" />
          </Button>
        </div>
        <Button variant="ghost">
          <Bookmark className="w-6 h-6 text-gray-700 hover:text-yellow-500" />
        </Button>
      </div>

      {/* Likes & Caption */}
      <p className="text-sm font-semibold">{post.likes} likes</p>
      <p className="text-sm">
        <span className="font-semibold">{post.username}</span> {post.caption}
      </p>

      {/* View Comments */}
      <button className="text-sm text-gray-500 mt-1">
        View all {post.comments} comments
      </button>
    </div>
  );
}
