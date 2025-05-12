import Tippy from "@tippyjs/react/headless";
import {
  Ellipsis,
  ThumbsUp,
  Pencil,
  Trash,
  BellOff,
  CircleMinus,
  CircleX,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import TippyWrapper from "../Wrapper/TippyWrapper";
import ActionMenuItem from "../ActionMenu/ActionMenuItem";
import { StoreContext } from "@/contexts/StoreProvider";
import SwiperWrapper from "../Swiper/SwiperWrapper";
import { Link } from "react-router-dom";
import ActionPost from "../ActionPost/ActionPost";
import ListComment from "../Comment";
import { formatDateTime } from "@/utils/formatDateTime";
import { usePost } from "@/hooks/usePost";
import { useLoading } from "@/hooks/useLoading";
import { ToastContext } from "@/contexts/ToastProvider";
import { BeatLoader } from "react-spinners";

const PostContent = ({
  data,
  fetchAllPost,
  hidden,
  comments,
  fetchLikeOrUnlike,
  isLiked,
}) => {
  const { userInfo, avatarDefault } = useContext(StoreContext);
  const { toast } = useContext(ToastContext);
  const [visible, setVisible] = useState(false);
  const {
    userId,
    postId,
    content,
    firstName,
    lastName,
    postImages,
    postLikeCount,
    postCommentCount,
    profilePicture,
    timestamp,
  } = data || {};

  const { deletePostById } = usePost();
  const { isLoading, loading, loaded } = useLoading();

  const handleDeletePost = async () => {
    loading();
    try {
      const res = await deletePostById(postId);
      if (res) {
        toast.success("Xóa bài viết thành công");
        loaded();
        fetchAllPost();
      }
    } catch (error) {
      toast.error("Xóa bài viết thất bại");
      loaded();
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    console.log("Comment count in PostContent: ", postCommentCount);
  }, [comments]);

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <Link to={`/user/profile/${userId}`} className="flex gap-3">
          <img
            src={profilePicture || avatarDefault}
            className="w-10 h-10 rounded-full object-cover"
            alt="avatar"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-zinc-800 dark:text-white">
                {firstName} {lastName}
              </span>
            </div>
            <p className="text-zinc-500 text-xs">{formatDateTime(timestamp)}</p>
          </div>
        </Link>
        <Tippy
          interactive
          visible={visible}
          onClickOutside={() => setVisible(false)}
          placement="bottom-end"
          render={(attrs) => (
            <div className="w-[280px] max-h-[calc(100vh-80px)] rounded-lg bg-white shadow-[-6px_5px_16px_7px_rgba(0,_0,_0,_0.2)]">
              <TippyWrapper {...attrs}>
                {userInfo?.data.userId === data.userId ? (
                  <>
                    <ActionMenuItem
                      icon={<Pencil className="w-5 h-5" />}
                      text={"Chỉnh sửa bài viết"}
                    />
                    <ActionMenuItem
                      onClick={() => handleDeletePost()}
                      icon={
                        isLoading ? (
                          <BeatLoader color="#2a2a2a" margin={3} size={10} />
                        ) : (
                          <Trash className="w-5 h-5" />
                        )
                      }
                      text={isLoading ? "" : "Xóa bài viết"}
                    />
                    <ActionMenuItem
                      icon={<BellOff className="w-5 h-5" />}
                      text={"Tắt thông báo bài viết này"}
                    />
                  </>
                ) : (
                  <>
                    <ActionMenuItem
                      icon={<CircleX className="w-5 h-5" />}
                      text={"Ẩn bài viết"}
                    />
                    <ActionMenuItem
                      icon={<CircleMinus className="w-5 h-5" />}
                      text={"Báo cáo bài viết"}
                    />
                  </>
                )}
              </TippyWrapper>
            </div>
          )}
        >
          <button onClick={() => setVisible(!visible)}>
            <Ellipsis className="text-zinc-500 hover:text-zinc-700 cursor-pointer" />
          </button>
        </Tippy>
      </div>

      {/* Caption */}
      <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-200">{content}</p>

      {/* Image and video */}
      {postImages && (
        <div className="mt-3">
          <SwiperWrapper
            data={postImages}
            itemPerPage={1}
            showNavigation={true}
          >
            {(item) =>
              item?.postImageUrl.toLowerCase().endsWith(".mp4") ? (
                <video
                  src={item.postImageUrl}
                  controls
                  className="w-full rounded-lg"
                />
              ) : (
                <img
                  src={item.postImageUrl}
                  alt="post"
                  className="w-full rounded-lg"
                />
              )
            }
          </SwiperWrapper>
        </div>
      )}

      {/* Reactions */}
      <div className="mt-3 flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 ">
            <ThumbsUp className="w-3 h-3 text-white" strokeWidth={3} />
          </div>
          <span>{postLikeCount}</span>
        </div>
        <div>
          <span className="hover:underline cursor-pointer">
            {postCommentCount > 0 ? (
              <span>{`${postCommentCount} bình luận`}</span>
            ) : (
              <></>
            )}
          </span>
        </div>
      </div>

      {/* Action buttons */}
      <div className={`${hidden ? "hidden" : ""}`}>
        <hr className="my-3 border-zinc-300 dark:border-zinc-700" />
        <ActionPost isLiked={isLiked} fetchLikeOrUnlike={fetchLikeOrUnlike} />
      </div>
      <hr className="my-3 border-zinc-300 dark:border-zinc-700" />

      {/* List comment */}
      {!hidden && <ListComment list={comments} />}
    </>
  );
};

export default PostContent;
