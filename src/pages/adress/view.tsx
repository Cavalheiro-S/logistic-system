import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAdress } from "@/hooks/queries/use-adress"

export const ViewAdress = () => {
    const { adress } = useAdress()
    return (
        <div className="min-w-[600px]">
            <Table className="w-full">
                <TableCaption>Lista de Endereços</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">ID</TableHead>
                        <TableHead>Rua</TableHead>
                        <TableHead>Bairro</TableHead>
                        <TableHead className="">Cidade</TableHead>
                        <TableHead className="">Estado</TableHead>
                        <TableHead className="">CEP</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {adress?.map((adress) => (
                        <TableRow>
                            <TableCell className="font-medium">{adress.id}</TableCell>
                            <TableCell>{adress.rua}</TableCell>
                            <TableCell>{adress.bairro}</TableCell>
                            <TableCell className="">{adress.cidade}</TableCell>
                            <TableCell className="">{adress.estado}</TableCell>
                            <TableCell className="">{adress.cep}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}