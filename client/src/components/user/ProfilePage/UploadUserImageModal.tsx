import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, useEffect, useRef } from "react";
import { GoPlus } from "react-icons/go";
import pic from "../../../assets/profpic.jpeg";
import useUploadUserImage from "../../../hooks/user/useUploadUserImage";
import { useProfileStore } from "../../../store/profile-store";
import { useUserStore } from "../../../store/user-store";

const UploadUserImageModal = () => {
  const {
    isOpenUploadProfile: isOpen,
    onCloseUploadProfile: onClose,
    imageType,
  } = useProfileStore();
  const initialRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { profilePicture, coverPhoto } = useUserStore();
  const handleInputClick = () => {
    fileInputRef.current?.click();
  };

  const {
    register,
    handleSubmit,
    onSubmit,
    loading,
    setValue,
    description,
    setDescription,
    imageFile,
    setImageFile,
    setImagePreview,
    imagePreview,
    isSuccessful,
    setIsSuccessful,
  } = useUploadUserImage(imageType);

  useEffect(() => {
    if (isSuccessful) {
      onClose();
      setIsSuccessful(false);
    }
  }, [isSuccessful, onClose]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setValue("file", file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
    setValue("description", e.target.value);
  };

  const handleRemoveImagePreviewClick = () => {
    setImagePreview(null);
    setImageFile(null);
    setValue("file", undefined);
    onClose();
  };

  useEffect(() => {
    if (!imagePreview) return;

    return () => {
      URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={handleRemoveImagePreviewClick}
        size="xl"
        isCentered
        preserveScrollBarGap={true}
      >
        <ModalOverlay />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalContent>
            <ModalHeader textAlign="center">
              {imageType === "PROFILE_PICTURE"
                ? "Choose profile picture"
                : "Choose cover photo"}
            </ModalHeader>
            <ModalCloseButton />
            <Divider />
            <ModalBody
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Description"
                  value={description}
                  {...register("description")}
                  ref={initialRef}
                  onChange={handleDescriptionChange}
                />
              </FormControl>
              {imageType === "PROFILE_PICTURE" ? (
                <Box width="300px" height="300px" mt="30px">
                  <Avatar
                    src={imagePreview || profilePicture || pic}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                  />
                </Box>
              ) : (
                <Box width="100%" height="300px" mt="30px">
                  <Image
                    src={
                      imagePreview ||
                      coverPhoto ||
                      "https://www.meme-arsenal.com/memes/b9856ce92d14d2fd8591c340759a7e78.jpg"
                    }
                    objectFit="cover"
                    width="100%"
                    height="100%"
                  />
                </Box>
              )}

              <Box mb="10px" mt="20px">
                <Box>
                  <Button onClick={handleInputClick}>
                    <GoPlus size="20px" />
                    <Text ml="5px">Upload Photo</Text>
                  </Button>
                  <input
                    type="file"
                    accept=".jpeg, .png"
                    {...register("file")}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </Box>
              </Box>
            </ModalBody>
            <Divider />
            <ModalFooter>
              <Button onClick={handleRemoveImagePreviewClick}>Cancel</Button>
              <Button
                colorScheme="blue"
                ml="5px"
                isDisabled={!imageFile}
                type="submit"
                isLoading={loading}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default UploadUserImageModal;
