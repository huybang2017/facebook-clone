import Post from "@/components/Post/Post";
import { useLoading } from "@/hooks/useLoading";
import { usePost } from "@/hooks/usePost";
import { useEffect, useState } from "react";

const Home = () => {
  const { getAllPost } = usePost();
  const [posts, setPosts] = useState([]);
  const { isLoading, loading, loaded } = useLoading();
  const fetchAllPost = async () => {
    loading();
    try {
      const res = await getAllPost();
      if (res) {
        setPosts(res);
        loaded();
      }
    } catch (error) {
      loaded();
      console.log(error);
      throw error;
    }
  };
  useEffect(() => {
    fetchAllPost();
  }, []);
  return (
    <div className="max-w-xl w-full px-4">
      {posts.length > 0 &&
        posts.map((post, index) => (
          <Post fetchAllPost={fetchAllPost} data={post} key={index} />
        ))}
    </div>
  );
};

export default Home;
