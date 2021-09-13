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
  ReactElement,
} from "react";

interface ModalProviderProps {
  children: ReactNode;
}

type ModalContextData = {
  isOpen: boolean;
  showModal: (Component: any, props?: any) => void;
  closeModal: () => void;
};

const ModalContext = createContext({} as ModalContextData);

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Component, setComponent] = useState<any>(null);

  const showModal = useCallback(
    (Component: any, props) => {
      setComponent(() => ({ element: Component, props }));

      onOpen();
    },
    [onOpen]
  );

  const closeModal = useCallback(() => {
    setComponent(() => null);
    onClose();
  }, [onClose]);

  return (
    <ModalContext.Provider value={{ showModal, closeModal, isOpen }}>
      {children}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent bg="transparent">
          {Component && <Component.element {...Component.props} />}
        </ModalContent>
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
