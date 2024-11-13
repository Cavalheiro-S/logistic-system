import { queryClient } from "@/lib/query-client"
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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Adress"] })
        }
    })

    const mutationUpdateAdress = useMutation({
        mutationKey: ["Adress"],
        mutationFn: (data: Adress) => updateAdress(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Adress"] })
        }
    })

    const mutationDeleteAdress = useMutation({
        mutationKey: ["Adress"],
        mutationFn: (data: Adress) => deleteAdress(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Adress"] })
        }
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