import {
  Ellipsis,
  Laugh,
  ThumbsUp,
  MessageCircle,
  Share,
  Send,
} from "lucide-react";
import { useState } from "react";

const PostContent = ({ fullname = "Test User", hidden, comments }) => {
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
                {fullname}
              </span>
            </div>
            <p className="text-zinc-500 text-xs">Hôm qua lúc 01:31</p>
          </div>
        </div>
        <Ellipsis className="text-zinc-500 hover:text-zinc-700 cursor-pointer" />
      </div>

      {/* Caption */}
      <p className="mt-3 text-sm text-zinc-700 dark:text-zinc-200">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout.
      </p>

      {/* Image */}
      <div className="mt-3">
        <img
          src="https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg"
          alt="post"
          className="w-full rounded-lg"
        />
      </div>

      {/* Reactions */}
      <div className="mt-3 flex justify-between text-sm text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4 text-yellow-500" />
          <span>1.291</span>
        </div>
        <div>
          <span>762 bình luận</span>
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
          <button className="flex items-center px-4 rounded py-2 hover:bg-gray-100 gap-2 cursor-pointer">
            <ThumbsUp className="w-4 h-4" /> Thích
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
          hidden && comments.length > 0 ? "hidden" : ""
        } my-3 border-zinc-300 dark:border-zinc-700 `}
      />

      {/* Comment component */}
      <div className={`${hidden ? "hidden" : "mb-[60px]"}`}>
        {comments.length > 0 &&
          comments.map((comment, index) => (
            <div key={index} class="flex gap-4 mb-4 w-full">
              <div class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img
                  alt=""
                  class="w-full h-full object-cover rounded-full"
                  src={comment.avatar}
                />
              </div>

              <div className="flex flex-col">
                <div class="flex flex-col p-2 bg-[#f1f2f6] rounded-xl">
                  <h4 class="text-sm font-medium">{comment.name}</h4>
                  <p class="text-sm font-normal">{comment.value}</p>
                </div>
                <div className="flex items-center gap-4 px-2 mt-1">
                  <span className="text-xs font-medium">{comment.time}</span>
                  <span className="text-xs font-medium hover:text-blue-500 hover:font-medium transition  cursor-pointer">
                    Thích
                  </span>
                  <span className="text-xs font-medium hover:text-blue-500 hover:font-medium transition  cursor-pointer">
                    Phản hồi
                  </span>
                  <span className="flex items-center justify-center text-xs bg-blue-500 text-white p-[3px] rounded-full font-medium transition ">
                    <ThumbsUp size={12} />
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default PostContent;
