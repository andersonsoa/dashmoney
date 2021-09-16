import {
  Box,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Select,
  Text,
  Stack,
} from "@chakra-ui/react";
import { usePeriod } from "../../hooks/usePeriod";
import { Input } from "../Form/Input";

type Period = {
  title: string;
  id: string;
};

type Transaction = {
  id: string;
  title: string;
  formattedValue: string;
  created_at: string;
  period: Period;
};

interface TransactionsTableProps {
  transactions: Transaction[];
  periods: Period[];
  filter: (period: string) => Promise<void>;
}

export const TransactionsTable = ({
  transactions,
  filter,
  periods,
}: TransactionsTableProps) => {
  return (
    <Box p="4" bg="gray.800" rounded="md">
      <Table variant="simple" colorScheme="whiteAlpha" size="sm">
        <Thead>
          <Tr>
            <Th>#</Th>
            <Th>
              <Stack h="16">
                <Text>Descrição</Text>
                <Input name="title" placeholder="Descricao" size="sm" />
              </Stack>
            </Th>
            <Th>
              <Stack h="16">
                <Text>Periodo</Text>
                <Select
                  bgColor="gray.900"
                  placeholder="Periodos"
                  size="sm"
                  variant="filled"
                  focusBorderColor="pink.500"
                  _hover={{
                    bg: "gray.900",
                  }}
                  onChange={(e) => filter(e.currentTarget.value)}
                >
                  <option value="">Todos</option>
                  {periods.map((period) => {
                    return (
                      <option key={period.id} value={period.id}>
                        {period.title}
                      </option>
                    );
                  })}
                </Select>
              </Stack>
            </Th>
            <Th>
              <Stack h="16">
                <Text>Valor</Text>
              </Stack>
            </Th>
            <Th>
              <Stack h="16">
                <Text>Data</Text>
              </Stack>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((transaction, idx) => {
            return (
              <Tr key={transaction.id}>
                <Td>{idx + 1}</Td>
                <Td>{transaction.title}</Td>
                <Td>{transaction.period.title}</Td>
                <Td>{transaction.formattedValue}</Td>
                <Td>{transaction.created_at}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
