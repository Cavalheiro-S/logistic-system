import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useVehicle } from "@/hooks/queries/use-vehicle"

export const ViewVehicle = () => {
    const { vehicles } = useVehicle()
    return (
        <div className="min-w-[600px]">
            <Table className="w-full">
                <TableCaption>Lista de veiculos</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">ID</TableHead>
                        <TableHead>Placa</TableHead>
                        <TableHead>Modelo</TableHead>
                        <TableHead className="">Capacidade</TableHead>
                        <TableHead className="">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {vehicles?.map((vehicle) => (
                        <TableRow>
                            <TableCell className="font-medium">{vehicle.id}</TableCell>
                            <TableCell>{vehicle.placa}</TableCell>
                            <TableCell>{vehicle.modelo}</TableCell>
                            <TableCell className="">{vehicle.capacidade}</TableCell>
                            <TableCell className="">{vehicle.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}