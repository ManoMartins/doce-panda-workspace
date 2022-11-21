import {useQuery} from "@tanstack/react-query";
import api from "../../../services/api";

interface GetCustomerQuery {
    customerId?: string
}

interface GetCustomerResponse {
    name: string
    email: string
    gender: string
    phoneNumber: string
    documentNumber: string
}

async function getCustomer({ customerId }: GetCustomerQuery): Promise<GetCustomerResponse | undefined> {
    if (!customerId) return

    const response = await api.get<GetCustomerResponse>(`/customers/${customerId}`)

    return response.data
}

function useGetCustomer(query: GetCustomerQuery) {
    return useQuery(['customer', query], () => getCustomer(query))
}

export { useGetCustomer }