import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, SquareUser, Bookmark } from "lucide-react";
import PostGrid from "./PostGrid";

const user = {
  username: "huydev",
  fullName: "Huy Nguyễn",
  avatar: "https://i.pravatar.cc/150?img=3",
  bio: "Fullstack Developer | Passion for UI/UX 💻✨",
  posts: 12,
  followers: 2345,
  following: 560,
};

const posts = [
  "/public/vite.svg",
  "/public/vite.svg",
  "/public/vite.svg",
  "/public/vite.svg",
  "/public/vite.svg",
  "/public/vite.svg",
];

export default function ProfileComponent() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Thông tin người dùng */}
      <div className="flex items-center gap-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={user.avatar} alt={user.username} />
          <AvatarFallback>{user.username[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{user.username}</h2>
          <p className="text-sm text-gray-600">{user.fullName}</p>
          <p className="text-sm">{user.bio}</p>
          <div className="flex gap-6 mt-2 text-sm">
            <p>
              <span className="font-semibold">{user.posts}</span> bài viết
            </p>
            <p>
              <span className="font-semibold">{user.followers}</span> người theo
              dõi
            </p>
            <p>
              <span className="font-semibold">{user.following}</span> đang theo
              dõi
            </p>
          </div>
          <Button className="mt-3">Chỉnh sửa trang cá nhân</Button>
        </div>
      </div>

      <Tabs defaultValue="posts" className="mt-6">
        <TabsList className="flex justify-center">
          <TabsTrigger value="posts">
            <Image className="w-5 h-5" />
          </TabsTrigger>
          <TabsTrigger value="saved">
            <Bookmark className="w-5 h-5" />
          </TabsTrigger>
          <TabsTrigger value="tagged">
            <SquareUser className="w-5 h-5" />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <PostGrid />
        </TabsContent>
        <TabsContent value="saved">
          <p className="text-center mt-4 text-gray-500">
            Chưa có bài viết đã lưu.
          </p>
        </TabsContent>

        <TabsContent value="tagged">
          <p className="text-center mt-4 text-gray-500">
            Chưa có bài viết được gắn thẻ.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
