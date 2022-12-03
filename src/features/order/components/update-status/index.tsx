import { Box, Dialog, Text, Button, Select, FormControl } from "@primer/react";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { OrderStatusEnum } from "@features/order/queries/use-get-orders";
import { useUpdateStatusOrder } from "@features/order/services/use-update-status-order";

interface UpdateStatusProps {
  orderId: string;
}

function UpdateStatus({ orderId }: UpdateStatusProps) {
  const [isOpen, setIsOpen] = useState(false);
  const returnFocusRef = useRef(null);

  const updateStatusOrder = useUpdateStatusOrder();

  const [statusSelected, setStatusSelected] = useState<
    keyof typeof OrderStatusEnum | undefined
  >(undefined);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement> | undefined) => {
      const value = event?.target.value;

      if (!value) return;

      setStatusSelected(value as keyof typeof OrderStatusEnum);
    },
    []
  );

  const handleUpdateStatus = useCallback(async () => {
    if (!statusSelected) return;

    await updateStatusOrder.mutateAsync({
      query: { orderId },
      data: { status: statusSelected },
    });
    console.log({ statusSelected });
  }, [orderId, statusSelected]);

  return (
    <>
      <Button ref={returnFocusRef} onClick={() => setIsOpen(true)}>
        Trocar status
      </Button>

      <Dialog
        isOpen={isOpen}
        returnFocusRef={returnFocusRef}
        onDismiss={() => setIsOpen(false)}
        aria-labelledby="label"
      >
        <Dialog.Header>Alterar status do pedido</Dialog.Header>

        <Box p={3}>
          <FormControl>
            <FormControl.Label>Para qual status você deseja?</FormControl.Label>

            <Select
              placeholder={"Selecione um status..."}
              onChange={handleOnChange}
            >
              <option value={OrderStatusEnum.WAITING_PAYMENT}>
                Pagamento aprovado
              </option>

              <option value={OrderStatusEnum.IN_TRANSIT}>Em transito</option>

              <option value={OrderStatusEnum.DELIVERED}>Entregue</option>
            </Select>
          </FormControl>
          <Text id="label" fontFamily="sans-serif"></Text>

          <Box display="flex" mt={3} justifyContent="flex-end">
            <Button sx={{ mr: 1 }} onClick={() => setIsOpen(false)}>
              Cancelar
            </Button>

            <Button variant="primary" onClick={handleUpdateStatus}>
              Salvar
            </Button>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

export { UpdateStatus };
