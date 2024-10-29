import { useAuth } from "@/hooks/use-auth"
import { Outlet } from "react-router-dom"
import { Navbar } from "../navbar"
import { Wrapper } from "../wrapper"

export const Layout = () => {
    const { isAuthenticated } = useAuth()

    return (
        <div className="w-screen h-screen overflow-x-hidden">
            {isAuthenticated && <Navbar />}
            <div className="flex h-full px-4">
                <Wrapper>
                    <Outlet />
                </Wrapper>
            </div>
        </div>
    )
}