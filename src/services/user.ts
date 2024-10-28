import { api } from "@/lib/axios"

export const getUsers = async () => {
    const response = await api.get<User[]>("/Usuarios")
    return response.data
}

export const createUser = async (data: User) => {
    const response = await api.post("/Usuarios", data)
    return response.data
}

export const updateUser = async (data: User) => {
    const response = await api.put(`/Usuarios/${data.id}`, data)
    return response.data
}

export const deleteUser = async (id: string) => {
    const response = await api.delete(`/Usuarios/${id}`)
    return response.data
}