import NextLink from "next/link";
import Router from "next/router";
import Joi from "joi";
import { Box, Flex, HStack, Input, Stack, Button } from "@chakra-ui/react";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { SSRAuth } from "../../utils/SSRAuth";
import { GetServerSidePropsContext } from "next";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useCard } from "../../hooks/useCard";

const schema = Joi.object({
  title: Joi.string().required(),
  color: Joi.string().required(),
  limit: Joi.number().required(),
});

export default function NewCard() {
  const { createNewCard } = useCard();
  const { handleSubmit, register, formState } = useForm({
    resolver: joiResolver(schema),
  });

  function handler(data) {
    createNewCard(data).then(() => {
      Router.push("/cards");
    });
  }

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
            <Box>
              <Input placeholder="Cor" {...register("color")} />
            </Box>
            <Box>
              <Input placeholder="Limite" {...register("limit")} />
            </Box>

            <HStack>
              <Button flex="1" colorScheme="green" type="submit">
                Salvar
              </Button>
              <NextLink href="/cards" passHref>
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
