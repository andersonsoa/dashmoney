import { Box, Flex, Grid, Icon, Stack, Text } from "@chakra-ui/react";
import { RiArrowUpCircleFill } from "react-icons/ri";
import { Card } from "./Card";

export const Summary = () => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="4" w="100%" mt="-4rem">
      <Card title="Entrada" type="deposit" value="R$ 2.000,52" />
      <Card title="Retirada" type="withdraw" value="R$ 2.000,52" />
      <Card title="Total" type="result" value="R$ 2.000,52" />
    </Grid>
  );
};
