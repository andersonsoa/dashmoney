import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { useModal } from "../../contexts/ModalContext";
import { SSRAuth } from "../../utils/SSRAuth";

export const Formulario = () => (
  <Flex bg="gray.100" justify="center">
    <Text color="gray.800" p="4">
      Novo Cartão
    </Text>
  </Flex>
);

export default function Cards() {
  const { showModal } = useModal();

  return (
    <Box>
      <Text>Cards</Text>
      <Button onClick={() => showModal(Formulario)}>Novo Cartão</Button>
    </Box>
  );
}

export const getServerSideProps = SSRAuth(
  async (ctx: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  }
);
