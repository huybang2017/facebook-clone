import { Box, Link } from "@chakra-ui/react";
import { FaLinkedin, FaYoutube } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import { TbWorldWww } from "react-icons/tb";

const MyLinks = () => {
  return (
    <Box display="flex">
      <Box
        mr="15px"
        _hover={{
          transform: "scale(1.15)",
          transition: "transform .15s ease-in",
          color: "blue.500",
        }}
      >
        <Link href="https://patrickv.vercel.app/" isExternal>
          <TbWorldWww size="25px" />
        </Link>
      </Box>
      <Box
        mr="15px"
        _hover={{
          transform: "scale(1.15)",
          transition: "transform .15s ease-in",
          color: "blue.500",
        }}
      >
        <Link href="https://www.linkedin.com/in/patrick-v-1b3641323" isExternal>
          <FaLinkedin size="25px" />
        </Link>
      </Box>
      <Box
        mr="15px"
        _hover={{
          transform: "scale(1.15)",
          transition: "transform .15s ease-in",
          color: "gray.600",
        }}
      >
        <Link href="https://github.com/gitpatrickv" isExternal>
          <IoLogoGithub size="25px" />
        </Link>
      </Box>
      <Box
        _hover={{
          transform: "scale(1.15)",
          transition: "transform .15s ease-in",
          color: "red",
        }}
      >
        <Link href="https://www.youtube.com/@CodingEpisodes/videos" isExternal>
          <FaYoutube size="25px" />
        </Link>
      </Box>
    </Box>
  );
};

export default MyLinks;
