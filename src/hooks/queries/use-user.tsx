import { createUser, deleteUser, getUsers, updateUser } from "@/services/user"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useUser = () => {

    const { data: users, isLoading, error } = useQuery({
        queryKey: ["user"],
        queryFn: () => getUsers(),
    })

    const mutationCreateUser = useMutation({
        mutationKey: ["user"],
        mutationFn: (data: User) => createUser(data),
    })

    const mutationUpdateUser = useMutation({
        mutationKey: ["user"],
        mutationFn: (data: User) => updateUser(data),
    })

    const mutationDeleteUser = useMutation({
        mutationKey: ["user"],
        mutationFn: (id: string) => deleteUser(id),
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