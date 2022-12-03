import { useMemo, useState } from "react";
import { ListTable, TableHeader } from "@components/list/list-table";
import { List } from "@components/list";
import { ListHeader } from "@components/list/list-header";
import { useFlash } from "@contexts/useFlash";
import { useError } from "@hooks/use-error";
import {
  GetOrderResponse,
  OrderStatusEnum,
  useGetOrders,
} from "@features/order/queries/use-get-orders";
import { formatCurrency } from "@utils/format-currency";
import { ListAction } from "@components/list/list-action";
import { Label } from "@primer/react";
import { UpdateStatus } from "@features/order/components/update-status";
import { StatusMapping } from "@features/order/mappins/status";

function ListOrder() {
  const flash = useFlash();
  const error = useError();

  const getOrders = useGetOrders();

  const headers = useMemo(() => {
    return [
      {
        label: "Status",
        accessor: "orderStatus",
        fn(value: OrderStatusEnum) {
          const statusMapping = StatusMapping[value];

          return (
            <Label variant={statusMapping.variant}>{statusMapping.label}</Label>
          );
        },
      },
      {
        label: "Valor total",
        accessor: "total",
        fn(value) {
          return formatCurrency(value);
        },
      },
      {
        label: "",
        isAction: true,
        fn(_, data) {
          return (
            <ListAction>
              <UpdateStatus orderId={data.id} />
            </ListAction>
          );
        },
      },
    ] as Array<TableHeader<GetOrderResponse>>;
  }, []);

  return (
    <List>
      <ListHeader title={"Pedidos"} />

      <ListTable
        testId={"table-orders"}
        headers={headers}
        data={getOrders.data}
      />
    </List>
  );
}

export { ListOrder };
