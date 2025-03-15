import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Grid, SquareUser, Bookmark } from "lucide-react";

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
  "https://source.unsplash.com/random/200x200?sig=1",
  "https://source.unsplash.com/random/200x200?sig=2",
  "https://source.unsplash.com/random/200x200?sig=3",
  "https://source.unsplash.com/random/200x200?sig=4",
  "https://source.unsplash.com/random/200x200?sig=5",
  "https://source.unsplash.com/random/200x200?sig=6",
];

export default function ProfilePage() {
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

      {/* Tabs: Bài viết, Đã lưu */}
      <Tabs defaultValue="posts" className="mt-6">
        <TabsList className="flex justify-center">
          <TabsTrigger value="posts">
            <Image className="w-5 h-5" /> Bài viết
          </TabsTrigger>
          <TabsTrigger value="saved">
            <Bookmark className="w-5 h-5" /> Đã lưu
          </TabsTrigger>
          <TabsTrigger value="tagged">
            <SquareUser className="w-5 h-5" /> Được gắn thẻ
          </TabsTrigger>
        </TabsList>

        {/* Danh sách bài viết */}
        <TabsContent value="posts">
          <div className="grid grid-cols-3 gap-2 mt-4">
            {posts.map((post, index) => (
              <img
                key={index}
                src={post}
                alt={`post-${index}`}
                className="w-full h-full object-cover rounded-md"
              />
            ))}
          </div>
        </TabsContent>

        {/* Danh sách bài viết đã lưu */}
        <TabsContent value="saved">
          <p className="text-center mt-4 text-gray-500">
            Chưa có bài viết đã lưu.
          </p>
        </TabsContent>

        {/* Danh sách bài viết được gắn thẻ */}
        <TabsContent value="tagged">
          <p className="text-center mt-4 text-gray-500">
            Chưa có bài viết được gắn thẻ.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
