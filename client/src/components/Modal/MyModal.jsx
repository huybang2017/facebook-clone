import { Box, Modal, Typography } from "@mui/material";
import { Send } from "lucide-react";
import CommentInput from "../CommentInput/CommentInput";

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
  onClose,
  children,
  type = "post",
  data,
  setComments,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div className="max-h-[calc(80vh-64px)] overflow-y-auto px-4 pt-4 pb-2">
          {children}
        </div>

        {(() => {
          switch (type) {
            case "post":
              return (
                <div className="border-t px-4 py-2 bg-white sticky bottom-0">
                  <CommentInput comments={data} setComments={setComments} />
                </div>
              );
            default:
              return null;
          }
        })()}
      </Box>
    </Modal>
  );
};

export default MyModal;
