import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { useModal } from "../../contexts/ModalContext";
import { Brand } from "./Brand";
import { Profile } from "./Profile";

interface HeaderProps {
  onAddTransaction: () => void;
}

export const Formulario = () => (
  <Flex bg="gray.100" justify="center">
    <Text color="gray.800" p="4">
      Nova Transação
    </Text>
  </Flex>
);

export const Header = ({ onAddTransaction }: HeaderProps) => {
  const { user, signout } = useAuth();
  const { showModal } = useModal();

  return (
    <Box bg="gray.800" pb="8rem">
      <Flex
        maxW={1164}
        w="100%"
        mx="auto"
        px="4"
        py="2"
        as="header"
        justify="space-between"
        align="center"
      >
        <Brand />

        <Stack direction="row" align="center" spacing="8">
          <Button
            colorScheme="blackAlpha"
            bg="gray.700"
            onClick={() => showModal(Formulario)}
          >
            Nova Transação
          </Button>

          <Profile user={user} onSignout={signout} />
        </Stack>
      </Flex>
    </Box>
  );
};
