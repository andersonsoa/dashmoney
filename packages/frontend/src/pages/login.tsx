import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Brand } from "../components/Header/Brand";
import { useAuth } from "../contexts/AuthContext";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { SSRGuest } from "../utils/SSRGuest";

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

  async function signIn(data: FormData) {
    await signin(data);
  }

  return (
    <Flex h="100vh" justify="center" align="flex-start">
      <Flex
        direction="column"
        bg="gray.800"
        maxW={420}
        w="100%"
        m="8"
        p="8"
        rounded="md"
      >
        <Brand />
        <Stack mt="6" as="form" spacing="6" onSubmit={handleSubmit(signIn)}>
          <Box>
            <Input placeholder="E-mail" name="email" {...register("email")} />
            {formState.errors.email && (
              <Text color="red.500" fontSize="small" mt="1">
                {formState.errors.email.message}
              </Text>
            )}
          </Box>

          <Box>
            <Input
              placeholder="Senha"
              type="password"
              name="password"
              {...register("password")}
            />
            {formState.errors.password && (
              <Text color="red.500" fontSize="small" mt="1">
                {formState.errors.password.message}
              </Text>
            )}
          </Box>

          <Button type="submit" colorScheme="whiteAlpha">
            Entrar
          </Button>

          <Box>
            <Text>Registrar-se</Text>
          </Box>
        </Stack>
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
