import {
  Box,
  Button,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { SSRAuth } from "../../utils/SSRAuth";
import NextLink from "next/link";
import { useCard } from "../../hooks/useCard";
import { RiEditBoxLine } from "react-icons/ri";

export default function Cards() {
  const { cards } = useCard();
  return (
    <>
      <Header />

      <Container>
        <Flex mt="8" justify="space-between">
          <Text as="h1" fontSize="2xl">
            Cartões cadastrados
          </Text>

          <NextLink href="/cards/new" passHref>
            <Button colorScheme="whiteAlpha">Adicionar</Button>
          </NextLink>
        </Flex>

        <Box p="4" bg="gray.800" rounded="md">
          <Table variant="simple" colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Descrição</Th>
                <Th>Limite</Th>
                <Th>Cor</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {cards.map((card, idx) => {
                return (
                  <Tr key={card.id}>
                    <Td>{idx + 1}</Td>
                    <Td>{card.title}</Td>
                    <Td>{card.limit}</Td>
                    <Td>
                      <Box w={25} h={25} rounded="full" bg={card.color}></Box>
                    </Td>
                    <Td>
                      <NextLink href={`cards/${card.id}`} passHref>
                        <IconButton
                          colorScheme="yellow"
                          fontSize="sm"
                          size="xs"
                          aria-label="editar"
                          icon={<Icon as={RiEditBoxLine} />}
                        />
                      </NextLink>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </>
  );
}

export const getServerSideProps = SSRAuth(
  async (ctx: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  }
);
