import { createVehicle, deleteVehicle, getVehicles, updateVehicle } from "@/services/vehicle"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useVehicle = () => {

    const { data: vehicles, isLoading, error } = useQuery({
        queryKey: ["Vehicle"],
        queryFn: () => getVehicles(),
    })

    const mutationCreateVehicle = useMutation({
        mutationKey: ["Vehicle"],
        mutationFn: (data: Vehicle) => createVehicle(data),
    })

    const mutationUpdateVehicle = useMutation({
        mutationKey: ["Vehicle"],
        mutationFn: (data: Vehicle) => updateVehicle(data),
    })

    const mutationDeleteVehicle = useMutation({
        mutationKey: ["Vehicle"],
        mutationFn: (id: string) => deleteVehicle(id),
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