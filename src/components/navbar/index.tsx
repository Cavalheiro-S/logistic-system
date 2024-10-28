import { useAuth } from "@/hooks/use-auth"
import { LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { Fragment } from "react/jsx-runtime"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu"
import { Separator } from "../ui/separator"
import useGetItems from "./hooks/use-get-items"

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
                            item.children.map((item, index) => (
                                <li key={item.title + index}>
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
        <div className="flex items-center justify-between w-full p-2 px-10 border-b-2 border-gray-200">
            <h2 className="text-xl">Sistema de logistica</h2>
            <Separator orientation="vertical" />
            <NavigationMenu className="m-2 mr-auto">
                <NavigationMenuList>
                    {data.map((item, index) =>
                        <Fragment key={item.title + index}>
                            {renderNavItem(item)}
                        </Fragment>
                    )}
                </NavigationMenuList>
            </NavigationMenu>
            <div className="flex flex-col items-center p-2 mr-2">
                <span>Lucas Cavalheiro</span>
                <span className="text-xs text-gray-500">Administrador</span>

            </div>
            <div onClick={() => {
                logout()
                window.location.reload()
                navigate("/signin")
            }} className="flex flex-col items-center gap-1 cursor-pointer">
                <LogOut size={20} />
            </div>
        </div>
    )
}