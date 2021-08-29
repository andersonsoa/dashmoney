import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";
import { Brand } from "./Brand";
import { Profile } from "./Profile";

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
          <Button colorScheme="blackAlpha" bg="gray.700">
            Nova Transação
          </Button>

          <Profile user={user} onSignout={signout} />
        </Stack>
      </Flex>
    </Box>
  );
};
