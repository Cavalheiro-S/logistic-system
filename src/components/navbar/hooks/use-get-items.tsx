import { RolesEnum } from "@/enum/roles";

const useGetItems = () => {
    const userRole = localStorage.getItem("role")?.toLocaleUpperCase() as RolesEnum;


    const navItems: NavItem[] = [
        {
            title: "Usuário",
            visible: userRole === RolesEnum.ADMIN,
            children: [
                {
                    title: "Cadastrar",
                    description: "Cadastre seus usuários",
                    path: "/user/create",
                    visible: userRole === RolesEnum.ADMIN,
                },
                {
                    title: "Listar",
                    description: "Liste seus usuários",
                    path: "/user/view",
                    visible: userRole === RolesEnum.ADMIN,
                }
            ]
        },
        {
            title: "Veículo",
            visible: userRole === RolesEnum.ADMIN,
            children: [
                {
                    title: "Cadastrar",
                    description: "Cadastre seus veículos",
                    path: "/vehicle/create",
                    visible: userRole === RolesEnum.ADMIN,
                },
                {
                    title: "Listar",
                    description: "Liste seus veículos",
                    path: "/vehicle/view",
                    visible: userRole === RolesEnum.ADMIN,
                }
            ],
        },
        {
            title: "Endereço",
            visible: userRole === RolesEnum.ADMIN,
            children: [
                {
                    title: "Cadastrar",
                    description: "Cadastre seus endereços",
                    path: "/adress/create",
                    visible: userRole === RolesEnum.ADMIN,
                },
                {
                    title: "Listar",
                    description: "Liste seus endereços",
                    path: "/adress/view",
                    visible: userRole === RolesEnum.ADMIN,
                }
            ]
        },
        {
            title: "Escolher Rota",
            visible: userRole === RolesEnum.DRIVER,
            children: [
                {
                    title: "Selecionar a Rota",
                    description: "Selecione sua rota de viagem",
                    path: "/",
                    visible: userRole === RolesEnum.DRIVER,
                }
            ]
        }
    ]
    return navItems
}

export default useGetItems