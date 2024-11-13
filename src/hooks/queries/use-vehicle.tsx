import { queryClient } from "@/lib/query-client"
import { createVehicle, deleteVehicle, getVehicles, updateVehicle } from "@/services/vehicle"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useVehicle = () => {

    const { data: vehicles, isLoading, error } = useQuery({
        queryKey: ["vehicle"],
        queryFn: () => getVehicles(),
    })

    const mutationCreateVehicle = useMutation({
        mutationKey: ["vehicle"],
        mutationFn: (data: PostVehicleRequest) => createVehicle(data),
    })

    const mutationUpdateVehicle = useMutation({
        mutationKey: ["vehicle"],
        mutationFn: (data: UpdateVehicleRequest) => updateVehicle(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicle"] })
        }
    })

    const mutationDeleteVehicle = useMutation({
        mutationKey: ["vehicle"],
        mutationFn: (place: string) => deleteVehicle(place),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["vehicle"] })
        }
    })

    return {
        vehicles,
        isLoading,
        error,
        mutationCreateVehicle,
        mutationUpdateVehicle,
        mutationDeleteVehicle
    }
}