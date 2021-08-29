import { Header } from "../components/Header";
import { Summary } from "../components/Summary";
import { Container } from "../components/Container";
import { TransactionsTable } from "../components/TransactionsTable";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { SSRAuth } from "../utils/SSRAuth";

export default function Home() {
  return (
    <>
      <Header />
      <Container>
        <Summary />
        <TransactionsTable />
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
