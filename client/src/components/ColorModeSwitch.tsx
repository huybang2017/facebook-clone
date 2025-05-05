import { IconButton, useColorMode } from "@chakra-ui/react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ColorModeSwitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();
  return (
    <IconButton
      aria-label={
        colorMode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
      }
      icon={
        colorMode === "dark" ? (
          <MdLightMode size="30px" />
        ) : (
          <MdDarkMode size="30px" />
        )
      }
      onClick={toggleColorMode}
      border="none"
      background="none"
      _hover={{ background: "none" }}
      _active={{ background: "none" }}
      mr="5px"
    />
  );
};

export default ColorModeSwitch;
