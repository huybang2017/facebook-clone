import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { BaseSyntheticEvent, useEffect, useRef, useState } from "react";
import {
  SubmitHandler,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { Link } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { ShareProps } from "../../../hooks/user/useSharePost";
import { useUserStore } from "../../../store/user-store";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  register: UseFormRegister<ShareProps>;
  onSubmit: SubmitHandler<ShareProps>;
  loading: boolean;
  handleSubmit: (
    onSubmit: SubmitHandler<ShareProps>
  ) => (event?: BaseSyntheticEvent) => Promise<void>;
  setValue: UseFormSetValue<ShareProps>;
  isSuccessful: boolean;
  setIsSuccessful: (value: boolean) => void;
}

const SharePostModal = ({
  isOpen,
  onClose,
  register,
  onSubmit,
  loading,
  handleSubmit,
  setValue,
  isSuccessful,
  setIsSuccessful,
}: ShareModalProps) => {
  const { firstName, lastName, profilePicture } = useUserStore();
  const initialRef = useRef<HTMLTextAreaElement | null>(null);
  const finalRef = useRef<HTMLTextAreaElement | null>(null);

  const [content, setContent] = useState("");

  const handleShareInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(e.target.value);
    setValue("content", e.target.value);
  };

  useEffect(() => {
    if (isSuccessful) {
      onClose();
      setIsSuccessful(false);
      setValue("content", "");
      setContent("");
    }
  }, [isSuccessful]);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
        isCentered
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader textAlign="center">Share</ModalHeader>
            <ModalCloseButton />
            <Divider />
            <Box>
              <Box display="flex" alignItems="center" padding={3}>
                <Link to="/profile">
                  <Avatar
                    src={profilePicture || pic}
                    height="30px"
                    width="30px"
                  />
                </Link>
                <Text ml="10px" textTransform="capitalize">
                  {firstName} {lastName}
                </Text>
              </Box>
              <FormControl>
                <Textarea
                  {...register("content")}
                  ref={initialRef}
                  value={content}
                  placeholder={`Say something about this`}
                  border="none"
                  _focus={{ border: "none", boxShadow: "none" }}
                  _hover={{ border: "none" }}
                  resize="none"
                  onChange={handleShareInputChange}
                />
              </FormControl>
              <Divider />
              <ModalFooter>
                <Button
                  type="submit"
                  width="120px"
                  bg="#1877F2"
                  _hover={{ bg: "#165BB7" }}
                  isLoading={loading}
                >
                  Share now
                </Button>
              </ModalFooter>
            </Box>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default SharePostModal;
