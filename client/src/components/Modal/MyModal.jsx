import { Box, Modal } from "@mui/material";
import CommentInput from "../CommentInput/CommentInput";
import { CircleX, X } from "lucide-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: 600,
  maxHeight: "80vh",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  overflow: "hidden",
};

const MyModal = ({
  open,
  setOpen,
  onClose,
  children,
  type = "post",
  data,
  postId,
  setComments,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div className="relative max-h-[calc(80vh-64px)] overflow-y-auto px-4 pt-4 pb-2">
          <button
            onClick={() => setOpen(false)}
            className="absolute top-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 group hover:bg-gray-200 cursor-pointer"
          >
            <X className="w-6 h-6 text-gray-400 group-hover:text-gray-500" />
          </button>
          {children}
        </div>

        {(() => {
          switch (type) {
            case "post":
              return (
                <div className="border-t px-4 py-2 bg-white sticky bottom-0">
                  <CommentInput
                    postId={postId}
                    comments={data}
                    setComments={setComments}
                  />
                </div>
              );
            default:
              return <></>;
          }
        })()}
      </Box>
    </Modal>
  );
};

export default MyModal;
