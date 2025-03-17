import PostCard from "../components/PostCard";
import Sidebar from "../components/Sidebar";
import StoryList from "../components/StoryList";

const samplePost = {
  userAvatar: "https://i.pravatar.cc/150?img=1",
  username: "john_doe",
  image: "https://source.unsplash.com/random/600x400",
  likes: 120,
  caption: "Enjoying the beautiful sunset! 🌅",
  comments: 45,
};

const Home = () => {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <div className="w-64 hidden lg:block fixed top-0 left-0 h-full p-4 border-r bg-white">
        <Sidebar />
      </div>

      <div className="w-full lg:ml-64 flex justify-center">
        <div className="max-w-xl w-full px-4">
          <div className="bg-white shadow-sm rounded-lg mb-4 p-4">
            <StoryList />
          </div>

          <PostCard post={samplePost} />
          <PostCard post={samplePost} />
        </div>
      </div>
    </div>
  );
};

export default Home;
