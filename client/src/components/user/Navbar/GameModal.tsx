import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
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
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notice</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>This feature is currently under development and not yet available.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Got it
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GameModal;
