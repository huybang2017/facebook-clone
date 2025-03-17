import React from "react";

const samplePosts = [
  { id: 1, image: "https://source.unsplash.com/random/300x300?sig=1" },
  { id: 2, image: "https://source.unsplash.com/random/300x300?sig=2" },
  { id: 3, image: "https://source.unsplash.com/random/300x300?sig=3" },
  { id: 4, image: "https://source.unsplash.com/random/300x300?sig=4" },
  { id: 5, image: "https://source.unsplash.com/random/300x300?sig=5" },
  { id: 6, image: "https://source.unsplash.com/random/300x300?sig=6" },
];

const PostGrid = () => {
  return (
    <div className="grid grid-cols-3 gap-1 md:gap-4 mt-4">
      {samplePosts.map((post) => (
        <div key={post.id} className="relative group">
          <img
            src={post.image}
            alt="Post"
            className="w-full h-32 md:h-48 object-cover rounded-md"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 hidden group-hover:flex justify-center items-center">
            <span className="text-white text-lg font-bold">❤️ 120</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostGrid;
