import { RolesLabelEnum } from "@/enum/roles";

const useGetItems = () => {
    const userRole = localStorage.getItem("role")?.toLocaleUpperCase() as RolesLabelEnum;
    const roleAdmin = RolesLabelEnum.ADMIN.toLocaleUpperCase();
    const roleDriver = RolesLabelEnum.DRIVER.toLocaleUpperCase();

    const navItems: NavItem[] = [
        {
            title: "Usuário",
            visible: userRole === roleAdmin,
            children: [
                {
                    title: "Cadastrar",
                    description: "Cadastre seus usuários",
                    path: "/user/create",
                    visible: userRole === roleAdmin,
                },
                {
                    title: "Listar",
                    description: "Liste seus usuários",
                    path: "/user/view",
                    visible: userRole === roleAdmin,
                }
            ]
        },
        {
            title: "Veículo",
            visible: userRole === roleAdmin,
            children: [
                {
                    title: "Cadastrar",
                    description: "Cadastre seus veículos",
                    path: "/vehicle/create",
                    visible: userRole === roleAdmin,
                },
                {
                    title: "Listar",
                    description: "Liste seus veículos",
                    path: "/vehicle/view",
                    visible: userRole === roleAdmin,
                }
            ],
        },
        {
            title: "Endereço",
            visible: userRole === roleAdmin,
            children: [
                {
                    title: "Cadastrar",
                    description: "Cadastre seus endereços",
                    path: "/adress/create",
                    visible: userRole === roleAdmin,
                },
                {
                    title: "Listar",
                    description: "Liste seus endereços",
                    path: "/adress/view",
                    visible: userRole === roleAdmin,
                }
            ]
        },
        {
            title: "Entrega",
            visible: userRole === roleDriver,
            children: [
                {
                    title: "Selecionar a Rota",
                    description: "Selecione sua rota de viagem",
                    path: "/delivery/choose",
                    visible: userRole === roleDriver,
                },
                {
                    title: "Rotas de Viagem",
                    description: "Visualize suas rotas de viagem",
                    path: "/delivery/view",
                    visible: userRole === roleDriver,
                }
            ]
        }
    ]
    return navItems
}

export default useGetItems