import PostCard from "./components/PostCard";

const samplePost = {
  userAvatar: "https://i.pravatar.cc/150?img=1",
  username: "john_doe",
  image: "https://source.unsplash.com/random/600x400",
  likes: 120,
  caption: "Một ngày tuyệt vời trên bãi biển! 🌊☀️",
  comments: 45,
};
const Test = () => {
  return (
    <div className="max-w-md mx-auto mt-5">
      <PostCard post={samplePost} />
    </div>
  );
};

export default Test;
