import { Link } from "react-router-dom"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "../ui/navigation-menu"
import { Separator } from "../ui/separator"

type NavItem = {
    title: string,
    description: string,
    pathCreate: string
    pathView: string
}

export const Navbar = () => {
    const navItems: NavItem[] = [
        {
            title: "Produtos",
            description: "Cadastre seus produtos",
            pathCreate: "/product/create",
            pathView: "/product/view",

        },
        {
            title: "Pedidos",
            description: "Cadastre seus pedidos",
            pathCreate: "/order/create",
            pathView: "/order/view"
        },
        {
            title: "Veículos",
            description: "Cadastre os veiculos",
            pathCreate: "/vehicle/create",
            pathView: "/vehicle/view"
        },
        {
            title: "Motoristas",
            description: "Cadastre os motoristas",
            pathCreate: "/driver/create",
            pathView: "/driver/view"
        },
        {
            title: "Usuários",
            description: "Cadastre os usuários",
            pathCreate: "/user/create",
            pathView: "/user/view"
        }
    ]

    const renderNavItem = (item: NavItem) => {

        return (
            <li className="p-2 rounded-md hover:bg-gray-200 ">
                <NavigationMenuLink asChild>
                    <Link className="text-start" to={item.pathCreate}>
                        <h4>{item.title}</h4>
                        <p className="text-sm leading-tight text-muted-foreground">
                            {item.description}
                        </p>
                    </Link>
                </NavigationMenuLink>
            </li>
        )
    }
    return (
        <div className="flex items-center justify-start p-2 px-4 space-x-4 border-b-2 border-gray-200">
            <h2 className="text-xl">Sistema de logistica</h2>
            <Separator orientation="vertical" />
            <NavigationMenu className="m-2">
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Cadastros</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid grid-cols-2 p-4 w-[600px]">
                                {navItems.map((item) => renderNavItem(item))}

                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}