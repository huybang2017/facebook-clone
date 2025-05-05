import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface Props {
  direction: "left" | "right";
  nextClick: () => void;
}

const NextButton = ({ direction, nextClick }: Props) => {
  const { colorMode } = useColorMode();
  return (
    <IconButton
      isRound={true}
      aria-label={direction === "left" ? "Left" : "Right"}
      bg={colorMode === "dark" ? "#303030" : "white"}
      _hover={{ bg: colorMode === "dark" ? "#404040" : "gray.200" }}
      _active={{ bg: colorMode === "dark" ? "#505050" : "gray.300" }}
      icon={
        direction === "left" ? (
          <FaChevronLeft size="20px" />
        ) : (
          <FaChevronRight size="20px" />
        )
      }
      size="lg"
      onClick={nextClick}
    />
  );
};

export default NextButton;
