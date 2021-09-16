import {
  Spinner,
  Button,
  Flex,
  Text,
  Icon,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalBody,
  ModalContent,
  Stack,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Header } from "../components/Header";
import { Summary } from "../components/Summary";
import { Container } from "../components/Container";
import { TransactionsTable } from "../components/TransactionsTable";
import { SSRAuth } from "../utils/SSRAuth";
import { useTransacion } from "../hooks/useTransaction";
import { RiAddLine } from "react-icons/ri";
import { Input } from "../components/Form/Input";
import { useCard } from "../hooks/useCard";
import { usePeriod } from "../hooks/usePeriod";

type NewTransaction = {
  title: string;
  value: number;
  period_id: string;
  card_id: string;
};

const schema = Yup.object({
  title: Yup.string().required("Campo obrigatório"),
  value: Yup.number().required("Campo obrigatório"),
  card_id: Yup.string().required("Campo obrigatório"),
  period_id: Yup.string().required("Campo obrigatório"),
});

export default function Home() {
  const { transactions, isLoading, total, createTransaction, getTransactions } =
    useTransacion();
  const { cards } = useCard();
  const { periods } = usePeriod();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const handler = async (data: NewTransaction) => {
    await createTransaction(data);

    onClose();
  };

  return (
    <>
      <Header />
      <Container>
        <Summary total={total} />

        <Flex justify="space-between" align="center">
          <Text as="h1" fontSize="2xl">
            Lista de Débitos
          </Text>
          <Button
            size="sm"
            colorScheme="whiteAlpha"
            leftIcon={<Icon as={RiAddLine} />}
            onClick={onOpen}
          >
            Adicionar Débito
          </Button>
        </Flex>

        <TransactionsTable
          transactions={transactions}
          periods={periods}
          filter={getTransactions}
        />
      </Container>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        colorScheme="whiteAlpha"
        size="sm"
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Adicionar Débitos</ModalHeader>
          <ModalBody>
            <Stack spacing="4" p="2" as="form" onSubmit={handleSubmit(handler)}>
              <Input
                name="title"
                placeholder="Descrição"
                {...register("title")}
              />

              <Input name="value" placeholder="Valor" {...register("value")} />

              <Select
                color="gray.50"
                bgColor="gray.900"
                variant="filled"
                placeholder="Selecione um Periodo"
                size="lg"
                _hover={{
                  bgColor: "gray.900",
                }}
                {...register("period_id")}
              >
                {periods.map((period) => {
                  return (
                    <option key={period.id} value={period.id}>
                      {period.title}
                    </option>
                  );
                })}
              </Select>

              <Select
                color="gray.50"
                bgColor="gray.900"
                variant="filled"
                placeholder="Selecione um Cartão"
                size="lg"
                _hover={{
                  bgColor: "gray.900",
                }}
                {...register("card_id")}
              >
                {cards.map((card) => {
                  return (
                    <option key={card.id} value={card.id}>
                      {card.title}
                    </option>
                  );
                })}
              </Select>

              <Button colorScheme="green" type="submit">
                Salvar
              </Button>

              <Stack direction="row">
                <Button
                  type="reset"
                  flex="1"
                  variant="ghost"
                  color="yellow.500"
                  colorScheme="blackAlpha"
                  size="sm"
                >
                  Limpar
                </Button>
                <Button
                  type="reset"
                  flex="1"
                  variant="ghost"
                  color="red.500"
                  colorScheme="blackAlpha"
                  onClick={onClose}
                  size="sm"
                >
                  Cancelar
                </Button>
              </Stack>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = SSRAuth(
  async (ctx: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  }
);
