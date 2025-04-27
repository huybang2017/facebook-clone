import { useState } from "react";
import { ThumbsUp, MessageCircle, Share, Send } from "lucide-react";
import MyModal from "../Modal/MyModal";
import PostContent from "../PostContent/PostContent";

const Post = ({ data }) => {
  const [openModal, setOpenModal] = useState(false);
  const onCloseModal = () => setOpenModal(false);

  const initStates = [
    {
      name: "Lê Phúc",
      avatar:
        "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
      value:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy.",
      time: "10 phút trước",
    },
    {
      name: "Xuân Bảo",
      avatar:
        "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
      value: "Test comment",
      time: "20 phút trước",
    },
    {
      name: "Tấn Cảnh",
      avatar:
        "https://i.pinimg.com/736x/f8/dc/9a/f8dc9ac53d0fe48d2710c5c0057dc857.jpg",
      value: "Test comment",
      time: "10 phút trước",
    },
  ];

  const [comments, setComments] = useState(initStates);

  return (
    <>
      <MyModal
        open={openModal}
        setOpen={setOpenModal}
        onClose={onCloseModal}
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
    </>
  );
};

export default Post;
