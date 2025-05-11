import { getPosts } from "@/apis/authService";
import Post from "@/components/Post/Post";
import { usePost } from "@/hooks/usePost";
import { useEffect, useState } from "react";

const Home = () => {
  const { getAllPost } = usePost();
  const [posts, setPosts] = useState([]);

  const fetchAllPost = async () => {
    try {
      const res = await getAllPost();
      if (res) setPosts(res);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    fetchAllPost();
  }, []);
  return (
    <div className="max-w-xl w-full px-4">
      {posts.length > 0 &&
        posts.map((post, index) => <Post data={post} key={index} />)}
    </div>
  );
};

export default Home;
