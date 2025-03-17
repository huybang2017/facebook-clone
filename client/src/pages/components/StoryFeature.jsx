import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const stories = [
  {
    id: 1,
    username: "huydev",
    avatar: "https://i.pravatar.cc/150?img=3",
    storyImage: "https://source.unsplash.com/random/400x700?sig=1",
  },
  {
    id: 2,
    username: "minhcode",
    avatar: "https://i.pravatar.cc/150?img=4",
    storyImage: "https://source.unsplash.com/random/400x700?sig=2",
  },
  {
    id: 3,
    username: "linhdesigner",
    avatar: "https://i.pravatar.cc/150?img=5",
    storyImage: "https://source.unsplash.com/random/400x700?sig=3",
  },
  {
    id: 4,
    username: "datdev",
    avatar: "https://i.pravatar.cc/150?img=6",
    storyImage: "https://source.unsplash.com/random/400x700?sig=4",
  },
];

export default function StoryFeature() {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <div className="flex gap-4 p-4 overflow-x-auto">
      {stories.map((story) => (
        <Dialog
          key={story.id}
          onOpenChange={(open) => !open && setSelectedStory(null)}
        >
          <DialogTrigger asChild>
            <div
              onClick={() => setSelectedStory(story)}
              className="flex flex-col items-center cursor-pointer"
            >
              <div className="p-[2px] bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 rounded-full">
                <Avatar className="w-16 h-16 border-2 border-white">
                  <AvatarImage src={story.avatar} alt={story.username} />
                  <AvatarFallback>{story.username[0]}</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-xs mt-1 text-gray-700">{story.username}</p>
            </div>
          </DialogTrigger>
          <DialogContent className="w-[400px] h-[700px] p-0 bg-black">
            {selectedStory && (
              <img
                src={selectedStory.storyImage}
                alt="story"
                className="w-full h-full object-cover rounded-md"
              />
            )}
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
