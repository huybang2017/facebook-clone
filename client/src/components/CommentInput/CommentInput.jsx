import { StoreContext } from "@/contexts/StoreProvider";
import { useComment } from "@/hooks/useComment";
import { Send } from "lucide-react";
import React, { useContext, useState } from "react";

const CommentInput = ({ postId, comments, setComments }) => {
  const [value, setValue] = useState("");

  const { userInfo } = useContext(StoreContext);

  const { firstName, lastName, profilePicture } = userInfo?.data;

  const { writeCommentForPost } = useComment();
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("comment", value);
      formData.append("file", null);

      const res = await writeCommentForPost(formData, postId);

      if (res) {
        const newComment = {
          firstName,
          lastName,
          avatar: profilePicture,
          comment: value,
          timestamp: Date.now(),
        };

        setComments([...comments, newComment]);
        setValue("");
      }
    } catch (error) {
      throw error;
    }
  };
  return (
    <form onSubmit={handleSumit} className="flex items-center gap-3 mt-4">
      <div className="flex-1 items-center justify-between relative">
        <input
          onChange={handleInputChange}
          value={value}
          type="text"
          placeholder="Viết bình luận..."
          className="w-full pl-4 pr-10 py-2 text-sm bg-gray-100 dark:bg-zinc-800 text-zinc-800 dark:text-white rounded-full focus:outline-none"
        />
      </div>
      <button type="submit">
        <Send
          size={20}
          className={`${
            value
              ? "text-blue-400 hover:text-blue-500 cursor-pointer"
              : "text-gray-300"
          }`}
        />
      </button>
    </form>
  );
};

export default CommentInput;
