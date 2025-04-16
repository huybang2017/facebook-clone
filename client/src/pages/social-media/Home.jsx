import { getPosts } from "@/apis/authService";
import Post from "@/components/Post/Post";
import { useEffect } from "react";

const Home = () => {
  return (
    <div className="max-w-xl w-full px-4">
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Home;
