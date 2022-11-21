import {useMutation} from "@tanstack/react-query";
import api from "../../../services/api";

interface CreateCustomerRequest {
    name: string
    email: string
    gender: string
    password: string
    phoneNumber: string
    documentNumber: string
}

async function createCustomer(data: CreateCustomerRequest) {
    await api.post(`/customers`, data)
}

function useCreateCustomer() {
    return useMutation(createCustomer)
}

export {useCreateCustomer};
export type { CreateCustomerRequest };
