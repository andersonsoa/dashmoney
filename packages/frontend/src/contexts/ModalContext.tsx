import {
  Modal,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useContext,
} from "react";

interface ModalProviderProps {
  children: ReactNode;
}

type ModalContextData = {
  isOpen: boolean;
  showModal: (Component: any) => void;
  onClose: () => void;
};

const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Component, setComponent] = useState<ReactNode | null>(null);

  const showModal = useCallback(
    (Component: any) => {
      setComponent(() => Component);

      onOpen();
    },
    [onOpen]
  );

  return (
    <ModalContext.Provider value={{ showModal, isOpen, onClose }}>
      {children}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>{Component}</ModalContent>
        <ModalOverlay />
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
