import {
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useTransacion } from "../../hooks/useTransaction";

export const TransactionsTable = () => {
  const { transactions, isLoading } = useTransacion();
  return (
    <Box p="4" bg="gray.800" rounded="md">
      {isLoading ? (
        <Spinner />
      ) : (
        <Table variant="simple" colorScheme="whiteAlpha">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Descrição</Th>
              <Th>Valor</Th>
              <Th>Data</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction, idx) => {
              return (
                <Tr key={transaction.id}>
                  <Td>{idx + 1}</Td>
                  <Td>{transaction.title}</Td>
                  <Td>{transaction.value}</Td>
                  <Td>{transaction.created_at}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};
