import { Box, Modal } from "@mui/material";
import CommentInput from "../CommentInput/CommentInput";
import { X } from "lucide-react";
import SimpleBar from "simplebar-react";

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
        <button
          onClick={() => setOpen(false)}
          className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full group cursor-pointer z-1000"
        >
          <X className="w-6 h-6 text-gray-300 group-hover:text-gray-500" />
        </button>
        <SimpleBar
          style={{
            maxHeight: 500,
            height: type == "post" ? 450 : "max-content",
            padding: "0 20px",
            marginBottom: 20,
            marginTop: 24,
          }}
        >
          <div className="relative max-h-[calc(80vh-64px)] px-4 pb-2">
            {children}
          </div>
        </SimpleBar>

        {(() => {
          switch (type) {
            case "post":
              return (
                <dv cilassName="border-t px-4 py-2 bg-white sticky bottom-0">
                  <CommentInput
                    postId={postId}
                    comments={data}
                    setComments={setComments}
                  />
                </dv>
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
