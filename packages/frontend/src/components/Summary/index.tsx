import { Grid } from "@chakra-ui/react";
import { Card } from "./Card";

interface SummaryProps {
  total: string;
}

export const Summary = ({ total }: SummaryProps) => {
  return (
    <Grid templateColumns="repeat(3, 1fr)" gap="4" w="100%" mt="-7rem">
      {/* <Card title="Entrada" type="deposit" value="R$ 2.000,52" /> */}
      <Card title="Débitos" type="withdraw" value={total} />
      {/* <Card title="Total" type="result" value="R$ 2.000,52" /> */}
    </Grid>
  );
};
