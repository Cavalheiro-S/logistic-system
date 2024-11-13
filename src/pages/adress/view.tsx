import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAdress } from "@/hooks/queries/use-adress"
import { useState } from "react"
import { ModalEditAdress } from "./components/modal-edit"

export const ViewAdress = () => {
    const { adress } = useAdress()
    const [open, setOpen] = useState(false)
    const [adressSelected, setAdressSelected] = useState<Adress | null>(null)

    const handleEditAdress = (adress: Adress | null) => {
        setAdressSelected(adress)
        setOpen(true)
    }

    return (
        <>
            <div className="min-w-[600px] bg-white">
                <Table className="w-full">
                    <TableCaption>Lista de Endereços</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Rua</TableHead>
                            <TableHead>Bairro</TableHead>
                            <TableHead>Cidade</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>CEP</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {adress?.map((adress, index) => (
                            <TableRow key={adress.rua+index} onClick={() => { handleEditAdress(adress) }} className="cursor-pointer">
                                <TableCell>{adress.rua}</TableCell>
                                <TableCell>{adress.bairro}</TableCell>
                                <TableCell>{adress.cidade}</TableCell>
                                <TableCell>{adress.estado}</TableCell>
                                <TableCell>{adress.cep}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <ModalEditAdress adress={adressSelected} open={open} setOpen={setOpen} />
        </>
    )
}