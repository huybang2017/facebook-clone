import { StoreContext } from "@/contexts/StoreProvider";
import { useComment } from "@/hooks/useComment";
import { Mic, ThumbsUp } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

const Comment = ({ data }) => {
  const { userInfo, avatarDefault } = useContext(StoreContext);
  const {
    postCommentId,
    userId,
    firstName,
    lastName,
    comment,
    commentImage,
    timestamp,
    avatar,
  } = data || {};

  useEffect(() => {
    console.log("Comment :", data);
  }, []);

  return (
    <div class="flex gap-4 mb-4 w-full">
      <Link
        to={`/user/profile/${userId}`}
        class="w-10 h-10 rounded-full overflow-hidden flex-shrink-0"
      >
        <img
          alt="avatar"
          class="w-full h-full object-cover rounded-full"
          src={avatar || avatarDefault}
        />
      </Link>

      <div className="flex flex-col">
        <div class="flex flex-col p-2 bg-[#f1f2f6] rounded-xl">
          <Link to={`/user/profile/${userId}`} class="text-sm font-medium">
            {firstName} {lastName}{" "}
          </Link>
          <p class="text-sm font-normal">{comment}</p>
        </div>
        <div className="flex items-center gap-4 px-2 mt-1">
          <span className="text-xs font-medium">{timestamp}</span>
        </div>
      </div>
    </div>
  );
};

export default Comment;
