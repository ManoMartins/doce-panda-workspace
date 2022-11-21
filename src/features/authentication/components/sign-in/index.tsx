import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Heading, Link, Text } from "@primer/react";

import Form from "@components/form";
import { useAuth } from "@features/authentication/contexts/use-auth";

interface FormData {
  email: string;
  password: string;
}

export function SignIn() {
  const methods = useForm();
  const { login } = useAuth();

  const onSubmit = useCallback(
    async (data: FormData) => {
      await login(data);
    },
    [login]
  );

  return (
    <Box width="19.25rem" mx="auto">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          mt="5"
          mb="4"
          width="48px"
          height="48px"
          borderRadius="50%"
          bg="canvas.subtle"
        />

        <Heading
          sx={{
            fontSize: 4,
            textAlign: "center",
            fontWeight: "normal",
            letterSpacing: "-0.05em",
          }}
        >
          Entrar em Doce Panda
        </Heading>
      </Box>

      <Box mt="3" bg="canvas.subtle" p="3" borderRadius="2">
        <Form methods={methods} onSubmit={onSubmit} sx={{ "> *": { mt: "3" } }}>
          <Form.Text name="email" label="Email" type="email" />

          <Form.Text name="password" label="Senha" type="password" />

          <Button
            type="submit"
            variant="primary"
            sx={{
              width: "100%",
            }}
          >
            Entrar
          </Button>
        </Form>
      </Box>

      <Box
        mt="3"
        px="3"
        borderRadius="2"
        border="1px solid"
        borderColor="border.default"
        fontSize="1"
      >
        <Text as="p" textAlign="center" letterSpacing="-0.025em">
          Novo em doce panda ? <Link href="/sign-up">Criar uma conta</Link>.
        </Text>
      </Box>
    </Box>
  );
}
