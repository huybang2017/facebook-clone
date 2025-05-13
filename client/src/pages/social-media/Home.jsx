import { useEffect, useState } from "react";
import IncomingCallScreen from "@/components/Message/IncomingCallScreen";
import Post from "@/components/Post/Post";
import { usePost } from "@/hooks/usePost";

const Home = () => {
  const { getAllPost } = usePost();
  const [posts, setPosts] = useState([]);
  const [isCallActive, setIsCallActive] = useState(false);

  const fetchAllPost = async () => {
    try {
      const res = await getAllPost();
      if (res) {
        setPosts(res);
        console.log(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllPost();
  }, []);

  const handleAcceptCall = () => {
    // Logic to handle accepting the call
    setIsCallActive(true);
    console.log("Call accepted");
  };

  const handleDeclineCall = () => {
    // Logic to handle declining the call
    setIsCallActive(false);
    console.log("Call declined");
  };

  return (
    <div className="max-w-xl w-full px-4">
      {isCallActive && (
        <IncomingCallScreen
          onAcceptCall={handleAcceptCall}
          onDeclineCall={handleDeclineCall}
        />
      )}
      {posts.length > 0 &&
        posts.map((post, index) => <Post data={post} key={index} />)}
    </div>
  );
};

export default Home;
