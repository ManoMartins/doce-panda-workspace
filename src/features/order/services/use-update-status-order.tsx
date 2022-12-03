import { useMutation } from "@tanstack/react-query";
import api from "@services/api";
import { OrderStatusEnum } from "@features/order/queries/use-get-orders";
import { queryClient } from "../../../App";

interface UpdateStatusOrder {
  query: { orderId: string };
  data: { status: keyof typeof OrderStatusEnum };
}

async function updateStatusOrder({ query, data }: UpdateStatusOrder) {
  await api.patch(`/orders/${query.orderId}`, {
    status: data.status,
  });
}

function useUpdateStatusOrder() {
  return useMutation(updateStatusOrder, {
    onSuccess: async () => {
      await queryClient.invalidateQueries(["orders"]);
    },
  });
}

export { useUpdateStatusOrder };
