import {
  Avatar,
  Box,
  Divider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import pic from "../../../assets/profpic.jpeg";
import { useProfileStore } from "../../../store/profile-store";
import { useUserStore } from "../../../store/user-store";

const EditProfileModal = () => {
  const {
    isOpenEditProfile,
    onCloseEditProfile,
    onOpenUploadProfile,
    setImageType,
  } = useProfileStore();

  const { profilePicture, coverPhoto } = useUserStore();

  const handleOpenModalClick = (image: string) => {
    setImageType(image);
    onOpenUploadProfile();
  };

  const { colorMode } = useColorMode();
  return (
    <>
      <Modal
        isOpen={isOpenEditProfile}
        onClose={onCloseEditProfile}
        isCentered
        size="lg"
        preserveScrollBarGap={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Edit Profile</ModalHeader>
          <Divider mb="10px" />
          <ModalCloseButton />
          <ModalBody>
            <Flex alignItems="center" justifyContent="space-between" mb="10px">
              <Text fontWeight="semibold" fontSize="x-large">
                Profile Picture
              </Text>

              <Text
                fontSize="lg"
                color="blue.500"
                cursor="pointer"
                _hover={{ textDecor: "underline" }}
                onClick={() => handleOpenModalClick("PROFILE_PICTURE")}
              >
                {profilePicture ? "Edit" : "Add"}
              </Text>
            </Flex>
            <Flex justifyContent="center" alignItems="center">
              <Avatar
                src={profilePicture || pic}
                width="180px"
                height="180px"
              />
            </Flex>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              mb="10px"
              mt="20px"
            >
              <Text fontWeight="semibold" fontSize="x-large">
                Cover Photo
              </Text>

              <Text
                fontSize="lg"
                color="blue.500"
                cursor="pointer"
                _hover={{ textDecor: "underline" }}
                onClick={() => handleOpenModalClick("COVER_PHOTO")}
              >
                {coverPhoto ? "Edit" : "Add"}
              </Text>
            </Flex>
            <Box
              width="100%"
              height="200px"
              bg={colorMode === "dark" ? "#181818" : "gray.100"}
              _hover={{ bg: colorMode === "dark" ? "#282828" : "gray.200" }}
              borderRadius="10px"
              mb="20px"
            >
              {coverPhoto && (
                <Image
                  src={coverPhoto}
                  width="100%"
                  height="100%"
                  borderRadius="10px"
                  overflow="hidden"
                />
              )}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
