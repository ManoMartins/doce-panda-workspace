import Form from "../../../../components/form";
import { Button, Text } from "@primer/react";
import { schema } from "./schema";
import { useCallback, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useGetCustomer } from "../../queries/use-get-customer";
import { Link } from "react-router-dom";
import { useUpdateCustomer } from "../../mutations/use-update-customer";
import { useError } from "../../../../hooks/use-error";
import { useFlash } from "../../../../contexts/useFlash";

interface InputUpdateCustomer {
  name: string;
  email: string;
  gender: string;
  phoneNumber: string;
  documentNumber: string;
}

interface OutputUpdateCustomer {
  name: string;
  email: string;
  gender: string;
  phoneNumber: string;
  documentNumber: string;
}

function ShowCustomer() {
  const { id } = useParams();

  const error = useError();
  const flash = useFlash();

  const getCustomer = useGetCustomer({ customerId: id });
  const updateCustomer = useUpdateCustomer();

  const [fieldErrors, setFieldErrors] = useState<any | undefined>(undefined);

  const defaultValues = useMemo(() => {
    if (!getCustomer || !getCustomer.data) return;

    const { name, gender, phoneNumber, documentNumber } = getCustomer.data;

    return {
      name,
      gender,
      phoneNumber,
      documentNumber,
    } as InputUpdateCustomer;
  }, [getCustomer.data]);

  const onSubmit = useCallback(async (data: OutputUpdateCustomer) => {
    if (!id) return;

    try {
      await updateCustomer.mutateAsync({
        query: { customerId: id },
        data: {
          name: data.name,
          email: data.email,
          gender: data.gender,
          phoneNumber: data.phoneNumber,
          documentNumber: data.documentNumber,
        },
      });

      flash.onOpen({ title: "Conta editada com sucesso.", variant: "success" });
    } catch (e) {
      const { validate } = error.handle(e);

      setFieldErrors(validate);
    }
  }, []);

  if (getCustomer.isLoading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <Form
      onSubmit={onSubmit}
      schema={schema}
      fieldErrors={fieldErrors}
      defaultValues={defaultValues}
    >
      <Form.Text name={"name"} label={"Nome"} />

      <Form.Text name={"email"} label={"Email"} />

      <Form.Text name={"gender"} label={"Gênero"} />

      <Form.Text name={"documentNumber"} label={"CPF"} />

      <Form.Text name={"phoneNumber"} label={"Telefone"} />

      <Form.Footer>
        <Button as={Link} to={"/customers"}>
          Voltar
        </Button>

        <Button variant={"primary"} type={"submit"}>
          Editar
        </Button>
      </Form.Footer>
    </Form>
  );
}

export { ShowCustomer };
