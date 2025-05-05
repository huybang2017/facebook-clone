import { Image, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import pic from "../../../assets/profpic.jpeg";
import { Images } from "../../../entities/PostImage";
import { usePostStore } from "../../../store/post-store";
import ProfileImagesModal from "./ProfileImagesModal";

interface Props {
  images: Images;
  imageList: Images[];
}

const ImageCard = ({ images, imageList }: Props) => {
  const location = useLocation();
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [photos, setPhotos] = useState<Images[]>(imageList);
  const [activeImage, setActiveImage] = useState<Images | null>(null);
  const { setIsPostImageModalOpen } = usePostStore();
  const handleImageClick = (images: Images) => {
    setActiveImage(images);
    setIsPostImageModalOpen(true);
    onOpen();
  };

  useEffect(() => {
    setPhotos(imageList);
  }, [imageList]);

  const handleSelectNextImageRightClick = () => {
    if (activeImage && photos.length > 0) {
      const currentIndex = photos.findIndex(
        (img) => img.postImageId === activeImage.postImageId
      );
      const nextIndex = (currentIndex + 1) % photos.length;
      setActiveImage(photos[nextIndex]);
    }
  };

  const handleSelectNextImageLeftClick = () => {
    if (activeImage && photos.length > 0) {
      const currentIndex = photos.findIndex(
        (img) => img.postImageId === activeImage.postImageId
      );
      const nextIndex = (currentIndex - 1 + photos.length) % photos.length;
      setActiveImage(photos[nextIndex]);
    }
  };

  return (
    <>
      <Image
        src={images.postImageUrl || pic}
        height={location.pathname === `/profile/${userId}` ? "130px" : "180px"}
        width="100%"
        borderRadius="10px"
        cursor="pointer"
        onClick={() => handleImageClick(images)}
      />
      <ProfileImagesModal
        isOpen={isOpen}
        onClose={onClose}
        activeImage={activeImage}
        nextRightImage={handleSelectNextImageRightClick}
        nextLeftImage={handleSelectNextImageLeftClick}
        imageList={imageList}
      />
    </>
  );
};

export default ImageCard;
