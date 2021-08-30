import { Box, Text } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { SSRAuth } from "../../utils/SSRAuth";

export default function Periods() {
  return (
    <Box>
      <Text>Periods</Text>
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
