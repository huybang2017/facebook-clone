import { useEffect } from "react";
import Comment from "./Comment";

const ListComment = ({ list }) => {
  useEffect(() => {
    console.log("List comment của bài viết hiện tại: ", list);
  }, [list]);
  return (
    <div className="mt-[30px]">
      {list?.map((comment) => (
        <Comment data={comment} />
      ))}
    </div>
  );
};

export default ListComment;
