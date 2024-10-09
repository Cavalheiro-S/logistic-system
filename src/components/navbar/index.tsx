import { Link } from "react-router-dom"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu"
import { Separator } from "../ui/separator"
import useGetItems from "./hooks/use-get-items"

export const Navbar = () => {
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
        <div className="flex items-center justify-start p-2 px-4 space-x-4 border-b-2 border-gray-200">
            <h2 className="text-xl">Sistema de logistica</h2>
            <Separator orientation="vertical" />
            <NavigationMenu className="m-2">
                <NavigationMenuList>
                    {data.map((item) => renderNavItem(item))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}