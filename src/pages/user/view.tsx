import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUser } from "@/hooks/queries/use-user"

export const ViewUser = () => {
    const { users } = useUser()
    return (
        <div className="min-w-[600px]">
            <Table className="w-full">
                <TableCaption>Lista de usuários</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">ID</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead className="">Acesso</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.nome}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell className="">{user.acesso}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}