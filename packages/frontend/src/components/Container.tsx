import { Box, Flex, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <Box>
      <Stack maxW={1164} w="100%" mx="auto" px="4" spacing="8">
        {children}
      </Stack>
    </Box>
  );
};
