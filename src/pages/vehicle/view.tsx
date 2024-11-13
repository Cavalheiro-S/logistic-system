import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useVehicle } from "@/hooks/queries/use-vehicle"
import { useState } from "react"
import { ModalEditVehicle } from "./components/modal-edit"

export const ViewVehicle = () => {
    const { vehicles } = useVehicle()

    const [open, setOpen] = useState(false)
    const [vehicleSelected, setVehicleSelected] = useState<GetVehicleResponse | null>(null)

    const handleEditVehicle = (vehicle: GetVehicleResponse) => {
        setVehicleSelected(vehicle)
        setOpen(true)
    }

    return (
        <>
            <div className="min-w-[600px] bg-white">
                <Table className="w-full">
                    <TableCaption>Lista de veiculos</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Placa</TableHead>
                            <TableHead>Modelo</TableHead>
                            <TableHead className="">Capacidade</TableHead>
                            <TableHead className="">Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {vehicles?.map((vehicle) => (
                            <TableRow onClick={() => { handleEditVehicle(vehicle) }} key={vehicle.placa} className="cursor-pointer">
                                <TableCell>{vehicle.placa}</TableCell>
                                <TableCell>{vehicle.modelo}</TableCell>
                                <TableCell className="">{vehicle.capacidade}</TableCell>
                                <TableCell className="">{vehicle.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <ModalEditVehicle vehicle={vehicleSelected} open={open} setOpen={setOpen} />
        </>
    )
}