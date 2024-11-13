import { api } from "@/lib/axios"

export const getVehicles = async () => {
    const response = await api.get<GetVehicleResponse[]>("/Veiculos")
    return response.data
}

export const createVehicle = async (data: PostVehicleRequest) => {
    const response = await api.post("/Veiculos", data)
    return response.data
}

export const updateVehicle = async (data: UpdateVehicleRequest) => {
    const response = await api.put(`/Veiculos`, data)
    return response.data
}

export const deleteVehicle = async (place: string) => {
    const response = await api.delete(`/Veiculos/${place}`)
    return response.data
}