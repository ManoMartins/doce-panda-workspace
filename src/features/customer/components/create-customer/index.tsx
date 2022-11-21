import Form from "../../../../components/form";
import { useCallback, useState } from "react";
import {
  CreateCustomerRequest,
  useCreateCustomer,
} from "../../mutations/use-create-customer";
import { Button } from "@primer/react";
import { schema } from "./schema";
import { useNavigate } from "react-router";
import { useError } from "../../../../hooks/use-error";
import { useFlash } from "../../../../contexts/useFlash";

function CreateCustomer() {
  const error = useError();
  const flash = useFlash();
  const navigate = useNavigate();

  const createCustomer = useCreateCustomer();

  const [fieldErrors, setFieldErrors] = useState<any | undefined>(undefined);

  const onSubmit = useCallback(async (data: CreateCustomerRequest) => {
    try {
      await createCustomer.mutateAsync(data);
      navigate("/customers");
      flash.onOpen({ title: "Conta criada com sucesso", variant: "success" });
    } catch (e: any) {
      const { validate } = error.handle(e);

      setFieldErrors(validate);
    }
  }, []);

  return (
    <>
      <Form onSubmit={onSubmit} schema={schema} fieldErrors={fieldErrors}>
        <Form.Text name={"name"} label={"Nome"} />

        <Form.Text name={"email"} label={"Email"} />

        <Form.Text name={"gender"} label={"Gênero"} />

        <Form.Text name={"documentNumber"} label={"CPF"} />

        <Form.Text name={"password"} label={"Senha"} type={"password"} />

        <Form.Text
          name={"confirmPassword"}
          label={"Confirmar Senha"}
          type={"password"}
        />

        <Form.Text name={"phoneNumber"} label={"Telefone"} />

        <Form.Footer>
          <Button onClick={() => navigate("/customers")}>Voltar</Button>

          <Button variant={"primary"} type={"submit"}>
            Cadastrar
          </Button>
        </Form.Footer>
      </Form>
    </>
  );
}

export { CreateCustomer };
