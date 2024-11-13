import { api } from "@/lib/axios"

export const getDelivery = async () => {
    const response = await api.get<Delivery[]>("/Entrega")
    return response.data
}

export const createDelivery = async (data: Delivery) => {
    const response = await api.post("/Entrega", data)
    return response.data
}

export const updateDelivery = async (data: Delivery) => {
    const response = await api.put(`/Entrega`, data)
    return response.data
}

export const deleteDelivery = async (data: Delivery) => {
    const response = await api.delete(`/Entrega`, {
        data
    })
    return response.data
}