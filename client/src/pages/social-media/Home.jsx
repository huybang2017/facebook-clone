import Navbar from "../components/Navbar";
import PostCard from "../components/PostCard";
import RightBar from "../components/RightBar";
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
      <div className="w-[360px] hidden lg:block fixed top-0 left-0 h-full p-4 border-r bg-white">
        <Sidebar />
      </div>

      <div className="w-full lg:mx-[360px] flex justify-center">
        <div className="max-w-xl w-full px-4">
          <div className="fixed top-0 z-10 bg-white shadow-sm rounded-lg mb-4 p-4">
            <Navbar />
          </div>

          <PostCard post={samplePost} />
          <PostCard post={samplePost} />
        </div>
      </div>

      <div className="w-[360px] hidden xl:block fixed z-10 top-0 right-0 h-full p-4 border-l bg-white overflow-y-auto scrollbar-hide">
        <RightBar />
      </div>
    </div>
  );
};

export default Home;
