import { RolesEnum } from "@/enum/roles";

const useGetItems = () => {
    const userRole = localStorage.getItem("role")?.toLocaleUpperCase() as RolesEnum;


    const navItems: NavItem[] = [
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
            title: "Endereço",
            visible: userRole === RolesEnum.ADMIN,
            children: [
                {
                    title: "Cadastrar",
                    description: "Cadastre seus endereços",
                    path: "/user/create",
                    visible: userRole === RolesEnum.ADMIN,
                },
                {
                    title: "Listar",
                    description: "Liste seus endereços",
                    path: "/user/view",
                    visible: userRole === RolesEnum.ADMIN,
                }
            ]
        }
    ]
    return navItems
}

export default useGetItems