import { Box, Heading, Text, useConfirm } from "@primer/react";
import { ReactNode, useCallback } from "react";
import { IconButton } from "../icon-button";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useFlash } from "../../contexts/useFlash";
import { useError } from "../../hooks/use-error";

interface ListActionProps {
  children: ReactNode;
}

interface DeleteActionProps {
  onConfirm: () => Promise<void>;
  confirmTitle?: ReactNode;
  confirmContent?: ReactNode;

  flashSuccessTitle?: string;
}

function DeleteAction({
  flashSuccessTitle,
  confirmContent,
  confirmTitle,
  onConfirm,
}: DeleteActionProps) {
  const error = useError();
  const flash = useFlash();
  const confirm = useConfirm();

  const handleDelete = useCallback(async () => {
    const result = await confirm({
      title: confirmTitle || (
        <Heading sx={{ fontSize: 2 }}>Remover item</Heading>
      ),
      content: confirmContent || (
        <Text as="p">
          Você deseja realmente remover esse item ? essa ação é irreversível
        </Text>
      ),
      cancelButtonContent: "Cancelar",
      confirmButtonType: "primary",
    });

    if (!result) return;

    try {
      await onConfirm();
      flash.onOpen({
        title: flashSuccessTitle || "Item removido com sucesso.",
        variant: "success",
      });
    } catch (e) {
      error.handle(e);
      console.error(e);
    }
  }, []);

  return (
    <IconButton
      icon={FiTrash2}
      aria-label={"Remover item"}
      onClick={handleDelete}
    />
  );
}

function DetailsAction() {
  return <IconButton icon={FiEdit} aria-label={"Detalhes do item"} />;
}

function ListAction({ children }: ListActionProps) {
  return (
    <Box display={"flex"} sx={{ "> *": { mr: 2 } }}>
      {children}
    </Box>
  );
}

ListAction.Delete = DeleteAction;
ListAction.Details = DetailsAction;

export { ListAction };
