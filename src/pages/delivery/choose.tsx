import { Button } from "@/components/ui/button"
import { useAdress } from "@/hooks/queries/use-adress"
import { Truck } from "lucide-react"
import { useState } from "react"
import EmptyData from "../../assets/empty_data.svg"
import { ConfirmModal } from "./components/confirm-modal"

export const DeliveryChoose = () => {
    const { adress } = useAdress()
    const [open, setOpen] = useState(false)
    const [adressSelected, setAdressSelected] = useState<Adress | null>(null)

    const renderAdress = (adress: Adress, index: number) => {
        return (
            <div key={adress.rua + index} className="flex flex-col gap-2 p-4 border rounded-lg shadow-lg min-w-[400px]">
                <p className="font-semibold text-center">Informações da entrega</p>
                <div className="flex flex-col gap-2 text-sm">
                    <div>
                        <span className="font-semibold">Rua: </span>{adress?.rua}
                    </div>
                    <div>
                        <span className="font-semibold">Bairro: </span>{adress?.bairro}
                    </div>
                    <div>
                        <span className="font-semibold">Cidade: </span>{adress?.cidade}
                    </div>
                    <div>
                        <span className="font-semibold">Estado: </span>{adress?.estado}
                    </div>
                    <div>
                        <span className="font-semibold">Cep: </span>{adress?.cep}
                    </div>
                </div>
                <Button
                    className="self-end w-fit"
                    type="button"
                    onClick={() => {
                        setOpen(true)
                        setAdressSelected(adress)
                    }}>
                    Selecionar
                </Button>
            </div>

        )
    }

    return (
        <>
            <div className="w-full h-full">
                <div className="flex items-center gap-2 mb-10">
                    <Truck size={32} />
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-semibold text-zinc-800">Rotas de Entrega</h2>
                        <span className="text-gray-500">Escolhe uma rota de entrega entre as rotas disponíveis</span>
                    </div>
                </div>
                <div className="flex gap-4">
                    {adress?.map(renderAdress)}
                    {!adress || adress?.length === 0 && (
                        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                            <img src={EmptyData} alt="Nenhuma rota disponível" className="w-60" />
                            <div className="flex flex-col items-center">
                                <h2 className="font-semibold text-zinc-800">Nenhuma rota de entrega disponível</h2>
                                <span className="text-sm text-gray-500">Procure seu supervisor para adicionar novas rotas</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <ConfirmModal adress={adressSelected} open={open} setOpen={setOpen} />
        </>
    )
}