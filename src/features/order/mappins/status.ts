import { OrderStatusEnum } from "@features/order/queries/use-get-orders";

interface StatusMappingType {
  variant:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "attention"
    | "severe"
    | "danger"
    | "done"
    | "sponsors";
  label: string;
}

export const StatusMapping: Record<OrderStatusEnum, StatusMappingType> = {
  [OrderStatusEnum.WAITING_PAYMENT]: {
    variant: "accent",
    label: "Aguardando pagamento",
  },
  [OrderStatusEnum.PREPARING]: {
    variant: "accent",
    label: "Preparando",
  },
  [OrderStatusEnum.IN_TRANSIT]: {
    variant: "accent",
    label: "Em transito",
  },
  [OrderStatusEnum.DELIVERED]: {
    variant: "success",
    label: "Entregue",
  },
};
