import { StoreContext } from "@/contexts/StoreProvider";
import { useComment } from "@/hooks/useComment";
import { useLoading } from "@/hooks/useLoading";
import { formatDateTime } from "@/utils/formatDateTime";
import { Send } from "lucide-react";
import React, { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";

const CommentInput = ({ postId, comments, setComments, setCommentCount }) => {
  const [value, setValue] = useState("");

  const { userInfo } = useContext(StoreContext);
  const { isLoading, loading, loaded } = useLoading();

  const { firstName, lastName, profilePicture } = userInfo?.data;

  const { writeCommentForPost } = useComment();
  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSumit = async (e) => {
    e.preventDefault();
    loading();
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
          timestamp: formatDateTime(Date.now()),
        };
        setComments([...comments, newComment]);
        setCommentCount?.((prev) => prev + 1);
        setValue("");
        loaded();
      }
    } catch (error) {
      loaded();
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
        {isLoading ? (
          <BeatLoader color="#759cfe" margin={1} size={5} />
        ) : (
          <Send
            size={20}
            className={`${
              value
                ? "text-blue-400 hover:text-blue-500 cursor-pointer"
                : "text-gray-300"
            }`}
          />
        )}
      </button>
    </form>
  );
};

export default CommentInput;
