import NextLink from "next/link";
import Router from "next/router";
import Joi from "joi";
import {
  Box,
  Flex,
  HStack,
  Input,
  Stack,
  Button,
  Text,
} from "@chakra-ui/react";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { SSRAuth } from "../../utils/SSRAuth";
import { GetServerSidePropsContext } from "next";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useCard } from "../../hooks/useCard";
import { buildApi } from "../../services/buildApi";

type Card = {
  id: string;
  title: string;
  color: string;
  limit: string;
};

interface EditCardProps {
  id: string;
  card: Card;
}

const schema = Joi.object({
  id: Joi.string(),
  title: Joi.string().required(),
  color: Joi.string().required(),
  limit: Joi.number().required(),
});

export default function EditCard({ card }: EditCardProps) {
  const { updateCard } = useCard();
  const { handleSubmit, register, formState } = useForm({
    resolver: joiResolver(schema),
    defaultValues: card,
  });

  function handler(data) {
    updateCard(data).then(() => {
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
              <Input placeholder="ID" {...register("id")} />
              {formState.errors?.id && (
                <Text>{formState.errors.id.message}</Text>
              )}
            </Box>
            <Box>
              <Input placeholder="Descrição" {...register("title")} />
              {formState.errors?.title && (
                <Text>{formState.errors.title.message}</Text>
              )}
            </Box>
            <Box>
              <Input placeholder="Cor" {...register("color")} />
              {formState.errors?.color && (
                <Text>{formState.errors.color.message}</Text>
              )}
            </Box>
            <Box>
              <Input placeholder="Limite" {...register("limit")} />
              {formState.errors?.limit && (
                <Text>{formState.errors.limit.message}</Text>
              )}
            </Box>

            <HStack>
              <Button flex="1" colorScheme="yellow" type="submit">
                Alterar
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
    const { id } = ctx.params;

    const api = buildApi(ctx);

    const { data } = await api.get<Card>(`cards/${id}`);

    return {
      props: {
        id,
        card: data,
      },
    };
  }
);
