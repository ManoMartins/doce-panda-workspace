import {useMutation} from "@tanstack/react-query";
import api from "../../../services/api";

interface UpdateCustomer {
    query: { customerId: string }
    data: {
        name: string
        email: string
        gender: string
        phoneNumber: string
        documentNumber: string
    }
}

async function updateCustomer({ query, data }: UpdateCustomer) {
    await api.put(`/customers/${query.customerId}`, data)
}

function useUpdateCustomer() {
    return useMutation(updateCustomer)
}

export { useUpdateCustomer }