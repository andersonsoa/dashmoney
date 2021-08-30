import { Box, Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PeriodModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const DashModal = ({ children, isOpen, onClose }: PeriodModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>{children}</ModalContent>
    </Modal>
  );
};
