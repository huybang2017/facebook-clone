import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PostImage from "../../../entities/PostImage";
import { usePostStore } from "../../../store/post-store";
import { getFlexBasis } from "../../../utilities/flexBasis";
import PostImagesModal from "./PostImagesModal";
import { PostProps } from "./Posts";

const isVideo = (url: string) => {
  const videoExtensions = [".mp4", ".webm", ".ogg", ".mov", ".mkv"];
  return videoExtensions.some((ext) => url.toLowerCase().includes(ext));
};

const PostImages = ({ posts }: PostProps) => {
  if (!posts.postImages || posts.postImages.length === 0) {
    return null;
  }

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [images, setImages] = useState<PostImage[]>(posts.postImages);
  const [activeImage, setActiveImage] = useState<PostImage | null>(null);
  const { setIsPostImageModalOpen } = usePostStore();

  useEffect(() => {
    if (posts.postImages && posts.postImages.length > 0) {
      setImages(posts.postImages);
      setActiveImage(posts.postImages[0]);
    }
  }, [posts.postImages]);

  const handleImageClick = (image: PostImage) => {
    setActiveImage(image);
    onOpen();
    setIsPostImageModalOpen(true);
  };

  const handleSelectNextImageRightClick = () => {
    if (activeImage && images.length > 0) {
      const currentIndex = images.findIndex(
        (img) => img.postImageId === activeImage.postImageId
      );
      const nextIndex = (currentIndex + 1) % images.length;
      setActiveImage(images[nextIndex]);
    }
  };

  const handleSelectNextImageLeftClick = () => {
    if (activeImage && images.length > 0) {
      const currentIndex = images.findIndex(
        (img) => img.postImageId === activeImage.postImageId
      );
      const nextIndex = (currentIndex - 1 + images.length) % images.length;
      setActiveImage(images[nextIndex]);
    }
  };

  const gap = posts.postImages.length + 1 - 6;

  return (
    <>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {images.slice(0, 6).map((image, index) => {
          const isVideoFile = image.postImageUrl
            ? isVideo(image.postImageUrl)
            : false;

          return (
            <Box
              key={image.postImageId}
              flexBasis={getFlexBasis(index, posts.postImages.length)}
              flexGrow={1}
              position="relative"
              cursor="pointer"
              onClick={() => handleImageClick(image)}
            >
              {isVideoFile ? (
                <video
                  src={image.postImageUrl}
                  width="100%"
                  height="auto"
                  loop
                  autoPlay
                  muted
                  playsInline
                  style={{
                    objectFit: "cover",
                    filter:
                      posts.postImages.length > 6 && index === 5
                        ? "brightness(0.3)"
                        : "none",
                  }}
                />
              ) : (
                <Image
                  src={image.postImageUrl}
                  width="100%"
                  minHeight="100%"
                  height="auto"
                  filter={
                    posts.postImages.length > 6 && index === 5
                      ? "brightness(0.3)"
                      : "none"
                  }
                />
              )}

              {posts.postImages.length > 6 && index === 5 && (
                <Text
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  color="white"
                  fontSize={{
                    base: "x-large",
                    md: "xx-large",
                    lg: "xxx-large",
                  }}
                  fontWeight="semibold"
                >
                  +{gap}
                </Text>
              )}
            </Box>
          );
        })}
        <PostImagesModal
          isOpen={isOpen}
          onClose={onClose}
          nextRightImage={handleSelectNextImageRightClick}
          nextLeftImage={handleSelectNextImageLeftClick}
          activeImage={activeImage}
          postImages={images}
          posts={posts}
        />
      </Box>
    </>
  );
};

export default PostImages;
