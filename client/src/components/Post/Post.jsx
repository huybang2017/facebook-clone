import { useState } from "react";
import { ThumbsUp, MessageCircle, Share, Send } from "lucide-react";
import MyModal from "../Modal/MyModal";
import PostContent from "../PostContent/PostContent";
import { useComment } from "@/hooks/useComment";
import { useLike } from "@/hooks/useLike";

const Post = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const [comments, setComments] = useState(null);

  const onCloseModal = () => setOpenModal(false);

  const { getAllCommentOfPost } = useComment();
  const { putReaction } = useLike();

  const { isLiked } = data || {};

  const [liked, setLiked] = useState(isLiked);

  const fetchAllComment = async () => {
    const allComment = await getAllCommentOfPost(data?.postId);
    if (allComment) {
      setComments(allComment);
    }
  };

  const fetchLikeOrUnlike = async () => {
    try {
      const res = await putReaction(data?.postId);
      if (res) setLiked(!liked);
    } catch (error) {
      throw error;
    }
  };
  const handeClickButtonComment = () => {
    setOpenModal(true);
    fetchAllComment();
  };

  return (
    <>
      <MyModal
        open={openModal}
        setOpen={setOpenModal}
        onClose={onCloseModal}
        postId={data?.postId}
        data={comments}
        setComments={setComments}
      >
        <h1 className="text-center text-xl mb-4 font-bold">
          Bài viết của {data?.name}
        </h1>
        <PostContent comments={comments} data={data} />
      </MyModal>

      <div className="bg-white dark:bg-zinc-900 shadow-md rounded-xl p-4 mx-auto my-6">
        <PostContent hidden data={data} comments={comments} />

        {/* Divider */}
        <hr className="my-3 border-zinc-300 dark:border-zinc-700" />

        {/* Action buttons */}
        <div className="flex justify-between text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <button
            onClick={fetchLikeOrUnlike}
            className={`flex items-center px-4 rounded py-2 hover:bg-gray-100 gap-2 cursor-pointer ${
              liked ? "text-blue-500 font-bold" : ""
            }`}
          >
            <ThumbsUp className="w-4 h-4" strokeWidth={liked ? 3 : 2} />{" "}
            <span>Thích</span>
          </button>
          <button
            onClick={handeClickButtonComment}
            className="flex items-center px-4 rounded py-2 hover:bg-gray-100 gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" /> Bình luận
          </button>
          <button className="flex items-center px-4 rounded py-2 hover:bg-gray-100 gap-2 cursor-pointer">
            <Share className="w-4 h-4" /> Chia sẻ
          </button>
        </div>
      </div>
    </>
  );
};

export default Post;
