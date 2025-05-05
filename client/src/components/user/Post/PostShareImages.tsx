import { Box, Image, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PostImage from "../../../entities/PostImage";
import { usePostStore } from "../../../store/post-store";
import { getFlexBasis } from "../../../utilities/flexBasis";
import PostImagesModal from "./PostImagesModal";
import { PostProps } from "./Posts";

const PostShareImages = ({ posts }: PostProps) => {
  if (!posts.sharedPost) {
    return null;
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [images, setImages] = useState<PostImage[]>(
    posts.sharedPost.postImages
  );
  const [activeImage, setActiveImage] = useState<PostImage | null>(null);
  const { setIsPostImageModalOpen } = usePostStore();
  useEffect(() => {
    if (posts.sharedPost && posts.sharedPost.postImages) {
      setImages(posts.sharedPost?.postImages);
      setActiveImage(posts.sharedPost.postImages[0]);
    }
  }, [posts.sharedPost?.postImages]);

  const handleImageClick = (images: PostImage) => {
    setActiveImage(images);
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

  const length = posts.sharedPost?.postImages?.length ?? 0;
  const gap = length + 1 - 6;

  return (
    <>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {images
          .slice(0, posts.sharedImage ? 1 : 6)
          .map((image, index) => {
            const targetImage = posts.sharedImage || image;
            const src = targetImage.postImageUrl;
            const isVideo = src?.match(/\.(mp4|webm|ogg|mov|mkv)$/i);

            return (
              <Box
                key={targetImage.postImageId}
                flexBasis={
                  posts.sharedImage ? undefined : getFlexBasis(index, length)
                }
                flexGrow={1}
                position="relative"
                cursor="pointer"
                onClick={() => handleImageClick(targetImage)}
              >
                {isVideo ? (
                  <video
                    src={src}
                    width="100%"
                    style={{
                      objectFit: "cover",
                      minHeight: "100%",
                      filter:
                        length > 6 && index === 5 ? "brightness(0.3)" : "none",
                    }}
                    muted
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={src}
                    objectFit="cover"
                    width="100%"
                    minHeight="100%"
                    height="auto"
                    filter={
                      length > 6 && index === 5 ? "brightness(0.3)" : "none"
                    }
                  />
                )}
                {length > 6 && index === 5 && (
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

export default PostShareImages;
