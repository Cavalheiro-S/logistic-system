import { RolesEnum } from "@/enum/roles";

export const mockLogin: User[] = [
    {
        nome: "Admin",
        email: "admin@email.com",
        senha: "123456",
        acesso: RolesEnum.ADMIN   
    },
    {
        nome: "Driver",
        email: "driver@email.com",
        senha: "123456",
        acesso: RolesEnum.DRIVER
    }
]