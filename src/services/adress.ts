import { api } from "@/lib/axios"

export const getAdress = async () => {
    const response = await api.get<Adress[]>("/EnderecosEntregas")
    return response.data
}

export const createAdress = async (data: Adress) => {
    const response = await api.post("/EnderecosEntregas", data)
    return response.data
}

export const updateAdress = async (data: Adress) => {
    const response = await api.put(`/EnderecosEntregas`, data)
    return response.data
}

export const deleteAdress = async (data: Adress) => {
    const response = await api.delete(`/EnderecosEntregas`, {
        data
    })
    return response.data
}