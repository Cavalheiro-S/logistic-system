import { Link, useNavigate } from "react-router-dom"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu"
import { Separator } from "../ui/separator"
import useGetItems from "./hooks/use-get-items"
import { LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

export const Navbar = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const data = useGetItems()

    const renderNavItem = (item: NavItem) => {

        return (
            <NavigationMenuItem className={`${item.visible ? "" : "hidden"}`}>
                <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul className="grid grid-cols-2 p-4 w-[600px]">
                        {
                            item.children.map((item) => (
                                <li>
                                    <NavigationMenuLink asChild>
                                        <Link className="text-start" to={item.path}>
                                            <h4>{item.title}</h4>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </Link>
                                    </NavigationMenuLink>
                                </li>
                            ))
                        }
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>
        )
    }
    return (
        <div className="flex items-center justify-between w-full p-2 px-4 border-b-2 border-gray-200">
            <h2 className="text-xl">Sistema de logistica</h2>
            <Separator orientation="vertical" />
            <NavigationMenu className="m-2 mr-auto">
                <NavigationMenuList>
                    {data.map((item) => renderNavItem(item))}
                </NavigationMenuList>
            </NavigationMenu>
            <div onClick={() => {
                logout()
                window.location.reload()
                navigate("/signin")
            }} className="flex items-center gap-2 cursor-pointer">
                <LogOut />
                <span>
                    Sair
                </span>
            </div>
        </div>
    )
}