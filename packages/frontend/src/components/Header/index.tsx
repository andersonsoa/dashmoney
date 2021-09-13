import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { Brand } from "./Brand";
import { Profile } from "./Profile";
import { ActiveLink } from "./ActiveLink";

export const Formulario = ({ onConfirm }: { onConfirm: () => void }) => (
  <Flex bg="gray.100" justify="center">
    <Text color="gray.800" p="4">
      Nova Transação
    </Text>
    <Button onClick={onConfirm}>Confirmar</Button>
  </Flex>
);

export const Header = () => {
  const { user, signout } = useAuth();

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
          <ActiveLink href="/dashboard" passHref shouldMatchExactHref>
            <ChakraLink>Home</ChakraLink>
          </ActiveLink>
          <ActiveLink href="/periods" passHref>
            <ChakraLink>Periodos</ChakraLink>
          </ActiveLink>
          <ActiveLink href="/cards" passHref>
            <ChakraLink>Cartões</ChakraLink>
          </ActiveLink>

          <Profile user={user} onSignout={signout} />
        </Stack>
      </Flex>
    </Box>
  );
};
