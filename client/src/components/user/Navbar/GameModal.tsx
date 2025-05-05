import {
  Box,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import tictactoe from "../../../assets/tictactoe.jpg";
import { useGameStore } from "../../../store/game-store";

const GameModal = () => {
  const { isOpen, onClose } = useGameStore();

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="sm" isCentered>
        <ModalOverlay />

        <ModalContent height="300px">
          <ModalHeader textAlign="center">Games</ModalHeader>
          <ModalCloseButton />
          <Divider />
          <ModalBody>
            <Box width="60px" height="60px" cursor="pointer">
              <Box
                overflow="hidden"
                borderRadius="4px"
                _hover={{
                  transform: "scale(1.03)",
                  transition: "transform .15s ease-in",
                }}
              >
                <Image src={tictactoe} />
              </Box>
              <Text fontSize="xs" ml="2px">
                Tic Tac Toe
              </Text>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameModal;
