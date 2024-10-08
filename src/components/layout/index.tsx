import { Outlet } from "react-router-dom"
import { Navbar } from "../navbar"

export const Layout = () => {
    return (
        <div className="w-screen h-screen overflow-x-hidden">
            <Navbar />
            <div className="flex items-center justify-center h-full px-4">
                <Outlet />
            </div>
        </div>
    )
}