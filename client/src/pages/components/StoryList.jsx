import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

const stories = [
  {
    id: 1,
    username: "huydev",
    avatar: "https://source.unsplash.com/50x50/?man",
  },
  {
    id: 2,
    username: "linhpham",
    avatar: "https://source.unsplash.com/50x50/?girl",
  },
  {
    id: 3,
    username: "quangnguyen",
    avatar: "https://source.unsplash.com/50x50/?boy",
  },
  {
    id: 4,
    username: "anniedao",
    avatar: "https://source.unsplash.com/50x50/?woman",
  },
  {
    id: 5,
    username: "johnny",
    avatar: "https://source.unsplash.com/50x50/?person",
  },
  {
    id: 6,
    username: "kellytran",
    avatar: "https://source.unsplash.com/50x50/?face",
  },
];

export default function StoryList() {
  return (
    <ScrollArea className="w-full py-3">
      <div className="flex space-x-4 overflow-x-auto px-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="p-1 bg-gradient-to-r from-yellow-400 to-pink-500 rounded-full">
              <Avatar className="border-2 border-white">
                <AvatarImage src={story.avatar} alt={story.username} />
                <AvatarFallback>{story.username.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs text-gray-700 mt-1">{story.username}</span>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
