import { getPosts } from "@/apis/authService";
import Post from "@/components/Post/Post";
import { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getNewFeeds = async () => {
      const res = await getPosts();
      if (res.status == 200 && res) {
        setPosts(res);
      }
    };
    getNewFeeds();
  }, []);
  return (
    <div className="max-w-xl w-full px-4">
      {posts.length > 0 &&
        posts.map((post, index) => <Post data={post} key={index} />)}
    </div>
  );
};

export default Home;
