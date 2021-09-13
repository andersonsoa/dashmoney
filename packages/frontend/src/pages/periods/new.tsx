import NextLink from "next/link";
import { Box, Flex, HStack, Input, Stack, Button } from "@chakra-ui/react";
import { GetServerSidePropsContext } from "next";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { SSRAuth } from "../../utils/SSRAuth";
import { SubmitHandler, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { usePeriod } from "../../hooks/usePeriod";
import Router from "next/router";

type PeriodData = {
  title: string;
};

const schema = Joi.object({
  title: Joi.string().required(),
});

export default function CreatePeriods() {
  const { createNewPeriod } = usePeriod();
  const { handleSubmit, register, formState } = useForm({
    resolver: joiResolver(schema),
  });

  const handler: SubmitHandler<PeriodData> = async (data) => {
    await createNewPeriod(data);

    Router.push("/periods");
  };

  return (
    <>
      <Header />
      <Container>
        <Flex justify="center">
          <Stack
            as="form"
            bg="gray.700"
            rounded="md"
            p="6"
            mt="-4rem"
            maxW={500}
            w="100%"
            spacing="8"
            shadow="2xl"
            onSubmit={handleSubmit(handler)}
          >
            <Box>
              <Input placeholder="Descrição" {...register("title")} />
            </Box>

            <HStack>
              <Button flex="1" colorScheme="green" type="submit">
                Salvar
              </Button>
              <NextLink href="/periods" passHref>
                <Button flex="1" colorScheme="red">
                  Cancelar
                </Button>
              </NextLink>
            </HStack>
          </Stack>
        </Flex>
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
