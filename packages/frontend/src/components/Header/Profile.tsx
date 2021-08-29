import { Avatar, Box, Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { RiLogoutBoxLine } from "react-icons/ri";

type User = {
  name?: string;
  email?: string;
};

interface ProfileProps {
  user: User;
  onSignout?: () => void;
}

export const Profile = ({
  user,
  onSignout = () => Promise.resolve(),
}: ProfileProps) => {
  return (
    <Flex align="center">
      <Avatar name={user?.name} bg="gray.300" mr="4" />
      <Box flex="1">
        <Text color="gray.100">{user?.name}</Text>
        <Flex align="center">
          <Text fontSize="small" color="gray.300">
            {user?.email}
          </Text>
          <IconButton
            aria-label="sair"
            colorScheme="blackAlpha"
            bg="transparent"
            size="sm"
            ml="2"
            onClick={onSignout}
            icon={<Icon as={RiLogoutBoxLine} />}
          />
        </Flex>
      </Box>
    </Flex>
  );
};
