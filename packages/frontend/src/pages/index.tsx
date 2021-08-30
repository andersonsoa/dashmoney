import { Header } from "../components/Header";
import { Summary } from "../components/Summary";
import { Container } from "../components/Container";
import { TransactionsTable } from "../components/TransactionsTable";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { SSRAuth } from "../utils/SSRAuth";
import { DashModal } from "../components/DashModal";
import { Box, useDisclosure } from "@chakra-ui/react";

export default function Home() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Header onAddTransaction={onOpen} />
      <Container>
        <Summary />
        <TransactionsTable />
        <DashModal isOpen={isOpen} onClose={onClose}>
          <Box>Alo</Box>
        </DashModal>
      </Container>
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
