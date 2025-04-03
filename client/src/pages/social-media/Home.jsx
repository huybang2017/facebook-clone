import PostCard from "../components/PostCard";

const samplePost = {
  userAvatar: "https://i.pravatar.cc/150?img=1",
  username: "john_doe",
  image:
    "https://i.pinimg.com/736x/99/56/dd/9956ddd16bc5adca02c445496791ef86.jpg",
  likes: 120,
  caption: "Enjoying the beautiful sunset! 🌅",
  comments: 45,
};

const Home = () => {
  return (
    <div className="max-w-xl w-full px-4">
      <PostCard post={samplePost} />
      <PostCard post={samplePost} />
    </div>
  );
};

export default Home;
