import { queryClient } from "@/lib/query-client"
import { createDelivery, getDelivery, updateDelivery } from "@/services/delivery"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useDelivery = () => {

    const {data: deliveries} = useQuery({
        queryKey: ['delivery'],
        queryFn:  () => getDelivery()
    })

    const mutationCreateDelivery = useMutation({
        mutationFn: (data: Delivery) => createDelivery(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['delivery'] })
        }
    })

    const mutationUpdateDelivery = useMutation({
        mutationFn: (data: Delivery) => updateDelivery(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['delivery'] })
        }
    })

    return {
        deliveries,
        mutationCreateDelivery,
        mutationUpdateDelivery
    }
}