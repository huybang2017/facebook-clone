import { Send } from "lucide-react";
import React, { useState } from "react";

const CommentInput = ({ comments, setComments }) => {
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handlePostComment = () => {
    const newComment = {
      name: "Test user",
      avatar:
        "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
      value: value,
      time: Date.now(),
    };

    setComments([...comments, newComment]);
    setValue("");
  };
  return (
    <div className="flex items-center gap-3 mt-4">
      <div className="flex-1 items-center justify-between relative">
        <input
          onChange={handleInputChange}
          value={value}
          type="text"
          placeholder="Viết bình luận..."
          className="w-full pl-4 pr-10 py-2 text-sm bg-gray-100 dark:bg-zinc-800 text-zinc-800 dark:text-white rounded-full focus:outline-none"
        />
      </div>
      <button onClick={handlePostComment}>
        <Send
          size={20}
          className={`${
            value
              ? "text-blue-400 hover:text-blue-500 cursor-pointer"
              : "text-gray-300"
          }`}
        />
      </button>
    </div>
  );
};

export default CommentInput;
