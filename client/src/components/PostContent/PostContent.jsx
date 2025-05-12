import Tippy from "@tippyjs/react/headless";
import {
  Ellipsis,
  ThumbsUp,
  MessageCircle,
  Share,
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
import Comment from "../Comment/Comment";

const PostContent = ({ data, hidden, comments }) => {
  const { userInfo } = useContext(StoreContext);
  console.log("userInfo :", userInfo);
  const [visible, setVisible] = useState(false);
  const {
    userId,
    postId,
    content,
    firstName,
    lastName,
    postImages,
    isLiked,
    postLikeCount,
    postCommentCount,
    timestamp,
  } = data || {};

  useEffect(() => {}, [comments]);

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img
            src="https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg"
            className="w-10 h-10 rounded-full object-cover"
            alt="avatar"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-zinc-800 dark:text-white">
                {firstName} {lastName}
              </span>
            </div>
            <p className="text-zinc-500 text-xs">{timestamp}</p>
          </div>
        </div>
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
                      icon={<Trash className="w-5 h-5" />}
                      text={"Xóa bài viết"}
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
          <ThumbsUp className="w-4 h-4 text-yellow-500" />
          <span>{postLikeCount}</span>
        </div>
        <div>
          <span className="hover:underline cursor-pointer">
            {postCommentCount} bình luận
          </span>
        </div>
      </div>

      <div className={`${hidden ? "hidden" : ""}`}>
        <hr className="my-3 border-zinc-300 dark:border-zinc-700" />

        {/* Action buttons */}
        <div
          className={`flex justify-between text-sm font-medium text-zinc-600 dark:text-zinc-300 ${
            hidden ? "hidden" : ""
          }`}
        >
          <button
            className={`flex items-center px-4 rounded py-2 hover:bg-gray-100 gap-2 cursor-pointer ${
              isLiked ? "text-blue-500 font-bold" : ""
            }`}
          >
            <ThumbsUp className="w-4 h-4" strokeWidth={isLiked ? 3 : 2} />{" "}
            <span>Thích</span>
          </button>
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center px-4 rounded py-2 hover:bg-gray-100 gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" /> Bình luận
          </button>
          <button className="flex items-center px-4 rounded py-2 hover:bg-gray-100 gap-2 cursor-pointer">
            <Share className="w-4 h-4" /> Chia sẻ
          </button>
        </div>
      </div>

      <hr
        className={`${
          hidden && comments?.length > 0 ? "hidden" : ""
        } my-3 border-zinc-300 dark:border-zinc-700 `}
      />

      {/* Comment component */}
      <div className={`${hidden ? "hidden" : "mb-[60px]"}`}>
        {comments && comments?.map((comment) => <Comment data={comment} />)}
      </div>
    </>
  );
};

export default PostContent;
