import NextLink from "next/link";
import {
  Box,
  Text,
  Flex,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { SSRAuth } from "../../utils/SSRAuth";
import { RiAddLine, RiDeleteBinLine, RiHandCoinLine } from "react-icons/ri";
import { usePeriod } from "../../hooks/usePeriod";

export default function Periods() {
  const { periods } = usePeriod();
  return (
    <>
      <Header />

      <Container>
        <Flex mt="8" justify="space-between">
          <Text as="h1" fontSize="2xl">
            Periodos cadastrados
          </Text>

          <NextLink href="/periods/new" passHref>
            <Button
              size="sm"
              colorScheme="pink"
              bg="pink.700"
              leftIcon={<Icon as={RiAddLine} />}
            >
              Adicionar
            </Button>
          </NextLink>
        </Flex>

        <Box p="4" bg="gray.800" rounded="md">
          <Table variant="simple" colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Descrição</Th>
                <Th>Status</Th>
                <Th>Data Criação</Th>
                <Th>Data Pagamento</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {periods.map((period, idx) => {
                return (
                  <Tr key={period.id}>
                    <Td>{idx + 1}</Td>
                    <Td>{period.title}</Td>
                    <Td>
                      <Box
                        w={25}
                        h={25}
                        rounded="full"
                        bg={period.payed ? "green.400" : "red.400"}
                      ></Box>
                    </Td>

                    <Td>{period.created_at}</Td>
                    <Td>{period.payed_at}</Td>
                    <Td>
                      <HStack>
                        <IconButton
                          colorScheme="green"
                          fontSize="sm"
                          size="xs"
                          aria-label="pagar"
                          icon={<Icon as={RiHandCoinLine} />}
                        />
                        <IconButton
                          colorScheme="red"
                          fontSize="sm"
                          size="xs"
                          aria-label="remover"
                          icon={<Icon as={RiDeleteBinLine} />}
                        />
                      </HStack>
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
