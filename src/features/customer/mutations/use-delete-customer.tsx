import {useMutation} from "@tanstack/react-query";
import api from "../../../services/api";
import {queryClient} from "../../../App";

interface DeleteCustomerQuery {
    customerId: string
}

async function deleteCustomer({ customerId }: DeleteCustomerQuery) {
    await api.delete(`/customers/${customerId}`)
}

function useDeleteCustomer() {
    return useMutation(deleteCustomer, {
        onSuccess: async () => {
            await queryClient.invalidateQueries(['customers'])
        }
    })
}

export { useDeleteCustomer }