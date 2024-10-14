import { Outlet } from "react-router-dom"
import { Navbar } from "../navbar"
import { Wrapper } from "../wrapper"
import { useEffect } from "react"
import { RolesEnum } from "@/enum/roles"
import { useAuth } from "@/hooks/use-auth"

export const Layout = () => {
    const { isAuthenticated } = useAuth()
    useEffect(() => {
        localStorage.setItem("role", RolesEnum.ADMIN)
    }, [])

    return (
        <div className="w-screen h-screen overflow-x-hidden">
            {isAuthenticated() && <Navbar />}
            <div className="flex h-full px-4">
                <Wrapper>
                    <Outlet />
                </Wrapper>
            </div>
        </div>
    )
}