import { PermissionEntities, PermissionEnum } from "@/enum/permission";
import { RolesEnum } from "@/enum/roles";
import { useState } from "react";

const useGetItems = () => {
    const userRole = localStorage.getItem("role")?.toLocaleUpperCase() as RolesEnum;
    
    const getAllPermissions = () => {
        const entities = Object.values(PermissionEntities);
        const actions = Object.values(PermissionEnum);
        const permissions: Permission[] = [];
        entities.forEach((entity) => {
            actions.forEach((action) => {
                permissions.push({
                    entitiy: entity,
                    action: action,
                });
            });
        });
        return permissions;
    }
    const [permissions,] = useState<Permission[]>(userRole === RolesEnum.ADMIN ? getAllPermissions() : []);

    const navItems: NavItem[] = [
        {
            title: "Veículo",
            visible: permissions.some(permission => permission.entitiy === PermissionEntities.VEHICLE),
            children: [
                {
                    title: "Cadastrar",
                    description: "Cadastre seus veículos",
                    path: "/vehicle/create",
                    visible: permissions.some(permission => permission.entitiy === PermissionEntities.VEHICLE && permission.action === PermissionEnum.CREATE),
                },
                {
                    title: "Listar",
                    description: "Liste seus veículos",
                    path: "/vehicle/view",
                    visible: permissions.some(permission => permission.entitiy === PermissionEntities.VEHICLE && permission.action === PermissionEnum.VIEW),
                }
            ],
        },
        {
            title: "Motorista",
            visible: permissions.some(permission => permission.entitiy === PermissionEntities.DRIVER),
            children: [
                {
                    title: "Cadastrar",
                    description: "Cadastre seus motoristas",
                    path: "/driver/create",
                    visible: permissions.some(permission => permission.entitiy === PermissionEntities.DRIVER && permission.action === PermissionEnum.CREATE),
                },
                {
                    title: "Listar",
                    description: "Liste seus motoristas",
                    path: "/driver/view",
                    visible: permissions.some(permission => permission.entitiy === PermissionEntities.DRIVER && permission.action === PermissionEnum.VIEW),
                }
            ]
        },
        {
            title: "Usuário",
            visible: permissions.some(permission => permission.entitiy === PermissionEntities.USER),
            children: [
                {
                    title: "Cadastrar",
                    description: "Cadastre seus usuários",
                    path: "/user/create",
                    visible: permissions.some(permission => permission.entitiy === PermissionEntities.USER && permission.action === PermissionEnum.CREATE),
                },
                {
                    title: "Listar",
                    description: "Liste seus usuários",
                    path: "/user/view",
                    visible: permissions.some(permission => permission.entitiy === PermissionEntities.USER && permission.action === PermissionEnum.VIEW),
                }
            ]
        }
    ]
    return navItems
}

export default useGetItems