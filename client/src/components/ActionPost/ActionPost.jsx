import { MessageCircle, Share, ThumbsUp } from "lucide-react";
import { useEffect } from "react";

const ActionPost = ({
  hidden,
  comments,
  isLiked,
  setOpenModal,
  fetchLikeOrUnlike,
  fetchAllCommentOfPost,
  visibleCommentInput,
  setVisibleCommentInput,
}) => {
  const handleVisibleModalPost = () => {
    setOpenModal?.(true);
    fetchAllCommentOfPost();
  };
  useEffect(() => {}, [isLiked]);
  return (
    <div
      className={`flex justify-between text-sm font-medium text-zinc-600 dark:text-zinc-300 ${
        hidden ? "hidden" : ""
      }`}
    >
      <button
        onClick={() => fetchLikeOrUnlike()}
        className={`flex items-center px-4 rounded py-2 hover:bg-gray-100 gap-2 cursor-pointer ${
          isLiked ? "text-blue-500 font-bold" : ""
        }`}
      >
        <ThumbsUp className="w-4 h-4" strokeWidth={isLiked ? 3 : 2} />{" "}
        <span>Thích</span>
      </button>
      <button
        onClick={handleVisibleModalPost}
        className="flex items-center px-4 rounded py-2 hover:bg-gray-100 gap-2 cursor-pointer"
      >
        <MessageCircle className="w-4 h-4" /> <span>Bình luận</span>
      </button>
      <button className="flex items-center px-4 rounded py-2 hover:bg-gray-100 gap-2 cursor-pointer">
        <Share className="w-4 h-4" /> <span>Chia sẻ</span>
      </button>
    </div>
  );
};

export default ActionPost;
