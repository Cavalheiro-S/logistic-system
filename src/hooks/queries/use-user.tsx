import { createUser, deleteUser, getUsers, updateUser } from "@/services/user"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useUser = () => {

    const queryClient = useQueryClient()

    const { data: users, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: () => getUsers(),
    })

    const mutationCreateUser = useMutation({
        mutationKey: ["user"],
        mutationFn: (data: User) => createUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
        }
    })

    const mutationUpdateUser = useMutation({
        mutationKey: ["user"],
        mutationFn: (data: User) => updateUser(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
        }
    })

    const mutationDeleteUser = useMutation({
        mutationKey: ["user"],
        mutationFn: (name: string) => deleteUser(name),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
        }
    })

    return {
        users,
        isLoading,
        error,
        mutationCreateUser,
        mutationUpdateUser,
        mutationDeleteUser
    }
}