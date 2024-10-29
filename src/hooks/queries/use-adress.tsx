import { createAdress, deleteAdress, getAdress, updateAdress } from "@/services/adress"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useAdress = () => {

    const { data: adress, isLoading, error } = useQuery({
        queryKey: ["Adress"],
        queryFn: () => getAdress(),
    })

    const mutationCreateAdress = useMutation({
        mutationKey: ["Adress"],
        mutationFn: (data: Adress) => createAdress(data),
    })

    const mutationUpdateAdress = useMutation({
        mutationKey: ["Adress"],
        mutationFn: (data: Adress) => updateAdress(data),
    })

    const mutationDeleteAdress = useMutation({
        mutationKey: ["Adress"],
        mutationFn: (id: string) => deleteAdress(id),
    })

    return {
        adress,
        isLoading,
        error,
        mutationCreateAdress,
        mutationUpdateAdress,
        mutationDeleteAdress
    }
}