import {useQuery} from "@tanstack/react-query";
import api from "../../../services/api";

interface GetCustomerResponse {
    id: string
    name: string
    email: string
    phoneNumber: string
    documentNumber: string
    rewardPoints: number
    createdAt: Date
    updatedAt: Date
}

async function getCustomers(): Promise<GetCustomerResponse[]> {
    const response = await api.get<GetCustomerResponse[]>('/customers')

    return response.data
}

function useGetCustomers() {
    return useQuery(['customers'], getCustomers)
}

export {useGetCustomers};
export type { GetCustomerResponse };
