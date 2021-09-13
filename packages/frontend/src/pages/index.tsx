import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Brand } from "../components/Header/Brand";
import { useAuth } from "../contexts/AuthContext";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { SSRGuest } from "../utils/SSRGuest";
import { Input } from "../components/Form/Input";

interface FormData {
  email: string;
  password: string;
}

const loginSchema = yup.object().shape({
  email: yup.string().required("E-mail não informado").email("E-mail inválido"),
  password: yup.string().required("Senha não informada"),
});

export default function Login() {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const { signin } = useAuth();

  async function handleSignin(data: FormData) {
    await signin(data);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        flexDir="column"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        onSubmit={handleSubmit(handleSignin)}
      >
        <Stack spacing="4">
          <Brand />
          <Input
            name="email"
            type="email"
            label="E-mail"
            error={formState.errors?.email}
            {...register("email")}
          />
          <Input
            name="password"
            type="password"
            label="Senha"
            error={formState.errors?.password}
            {...register("password")}
          />
        </Stack>

        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = SSRGuest(
  async (ctx: GetServerSidePropsContext) => {
    return {
      props: {},
    };
  }
);
