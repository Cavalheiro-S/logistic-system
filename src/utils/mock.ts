import { RolesEnum } from "@/enum/roles";

export const mockLogin = [
    {
        name: "Admin",
        email: "admin@email.com",
        password: "123456",
        acess: RolesEnum.ADMIN   
    },
    {
        name: "Driver",
        email: "driver@email.com",
        password: "123456",
        acess: RolesEnum.DRIVER
    }
]