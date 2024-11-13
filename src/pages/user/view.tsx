import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUser } from "@/hooks/queries/use-user"
import { useState } from "react"
import { ModalEditUser } from "./components/modal-edit"


export const ViewUser = () => {
    const { users } = useUser()
    const [open, setOpen] = useState(false)
    const [userSelected, setUserSelected] = useState<User | null>(null)

    const handleEditUser = (user: User) => {
        setUserSelected(user)
        setOpen(true)
    }
    return (
        <>
            <div className="min-w-[600px] bg-white">
                <Table className="w-full">
                    <TableCaption>Lista de usuários</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead className="">Acesso</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((user) => (
                            <TableRow onClick={() => handleEditUser(user)} key={user.nome} className="cursor-pointer">
                                <TableCell>{user.nome}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell className="">{user.acesso}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <ModalEditUser user={userSelected} open={open} setOpen={setOpen} />
        </>
    )
}