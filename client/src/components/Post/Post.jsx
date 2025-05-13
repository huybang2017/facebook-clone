import { useContext, useEffect, useState } from "react";
import MyModal from "../Modal/MyModal";
import PostContent from "../PostContent/PostContent";
import { useComment } from "@/hooks/useComment";
import { useLike } from "@/hooks/useLike";
import { StoreContext } from "@/contexts/StoreProvider";
import ActionPost from "../ActionPost/ActionPost";

const Post = ({ data, fetchAllPost }) => {
  const [openModal, setOpenModal] = useState(false);
  const [comments, setComments] = useState(null);
  const [visibleCommentInput, setVisibleCommentInput] = useState(false);

  const { userInfo } = useContext(StoreContext);

  const onCloseModal = () => setOpenModal(false);

  const { getAllCommentOfPost } = useComment();
  const { putReaction } = useLike();

  const [liked, setLiked] = useState(data.isLiked);
  const [likeCount, setLikeCount] = useState(data?.postLikeCount || 0);
  const [commentCount, setCommentCount] = useState(data?.postCommentCount || 0);

  const fetchLikeOrUnlike = async () => {
    try {
      const res = await putReaction(data?.postId);
      if (res) {
        setLiked(!liked);
        setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchAllCommentOfPost = async () => {
    try {
      const res = await getAllCommentOfPost(data?.postId);
      if (res) {
        setComments(res);
      }
    } catch (error) {
      setComments([]);
    }
  };

  useEffect(() => {
    fetchAllCommentOfPost();
  }, [commentCount]);

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
          Bài viết của{" "}
          {userInfo?.data.userId === data?.userId
            ? "bạn"
            : `${data?.firstName} ${data?.lastName}`}
        </h1>

        <PostContent
          isLiked={liked}
          fetchLikeOrUnlike={fetchLikeOrUnlike}
          data={{
            ...data,
            postLikeCount: likeCount,
            postCommentCount: commentCount,
          }}
          comments={comments}
        />
      </MyModal>

      <div className="bg-white dark:bg-zinc-900 shadow-md rounded-xl p-4 mx-auto my-6">
        <PostContent
          hidden // prop này dùng để ẩn đi các comment của bài viết, chỉ hiển thị khi mở modal
          data={{
            ...data,
            postLikeCount: likeCount,
            postCommentCount: commentCount,
          }}
          comments={comments}
          fetchAllPost={fetchAllPost}
        />

        {/* Action buttons */}
        <ActionPost
          comments={comments}
          visibleCommentInput={visibleCommentInput}
          setVisibleCommentInput={setVisibleCommentInput}
          isLiked={liked}
          setOpenModal={setOpenModal}
          fetchLikeOrUnlike={fetchLikeOrUnlike}
          fetchAllCommentOfPost={fetchAllCommentOfPost}
        />
      </div>
    </>
  );
};

export default Post;
