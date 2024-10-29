import { api } from "@/lib/axios"

export const getVehicles = async () => {
    const response = await api.get<Vehicle[]>("/Veiculos")
    return response.data
}

export const createVehicle = async (data: Vehicle) => {
    const response = await api.post("/Veiculos", data)
    return response.data
}

export const updateVehicle = async (data: Vehicle) => {
    const response = await api.put(`/Veiculos/${data.id}`, data)
    return response.data
}

export const deleteVehicle = async (id: string) => {
    const response = await api.delete(`/Veiculos/${id}`)
    return response.data
}