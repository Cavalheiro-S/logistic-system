import { RolesEnum } from "@/enum/roles"

export const useAuth = () => {

    return {
        login: () => {
            localStorage.setItem("role", RolesEnum.ADMIN)
            localStorage.setItem("token", "token")
        },
        logout: () => {
            localStorage.removeItem("role")
            localStorage.removeItem("token")
        },
        isAuthenticated: () => {
            return localStorage.getItem("token") ? true : false
        },
    }
}