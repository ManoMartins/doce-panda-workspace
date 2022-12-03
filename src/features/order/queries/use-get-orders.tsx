import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import { centsToReal } from "../../../utils/cents-to-real";

export enum OrderStatusEnum {
  WAITING_PAYMENT = "WAITING_PAYMENT",
  PREPARING = "PREPARING",
  IN_TRANSIT = "IN_TRANSIT",
  DELIVERED = "DELIVERED",
}

interface GetOrderResponseApi {
  id: string;
  orderItems: any[];
  totalInCents: number;
  status: OrderStatusEnum;
  createdAt: Date;
  updatedAt: Date;
}

interface GetOrderResponse {
  id: string;
  orderItems: any[];
  total: number;
  orderStatus: OrderStatusEnum;
}

async function getOrders(): Promise<GetOrderResponse[]> {
  const { data } = await api.get<{ data: GetOrderResponseApi[] }>("/orders");

  return data.data.map((order) => ({
    id: order.id,
    orderItems: order.orderItems,
    total: centsToReal(order.totalInCents),
    orderStatus: order.status,
  }));
}

function useGetOrders() {
  return useQuery(["orders"], getOrders);
}

export { useGetOrders };
export type { GetOrderResponse };
