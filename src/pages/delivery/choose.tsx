import { Button } from "@/components/ui/button"
import { useAdress } from "@/hooks/queries/use-adress"
import { Truck } from "lucide-react"
import { useState } from "react"
import EmptyData from "../../assets/empty_data.svg"
import { ConfirmModal } from "./components/confirm-modal"

export const DeliveryChoose = () => {
    const { adress } = useAdress()
    const [open, setOpen] = useState(false)

    const renderAdress = (adress: Adress) => {
        return (
            <div className="flex flex-col gap-2 p-4 border rounded-lg shadow-lg">
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
                <Button className="self-end w-fit" type="button" onClick={() => setOpen(true)}>Selecionar</Button>
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
                {adress?.map((adress) => renderAdress(adress))}
                {!adress || adress?.length === 0 && (
                    <div className="flex flex-col items-center justify-center w-full h-full gap-2 my-12">
                        <img src={EmptyData} alt="Nenhuma rota disponível" className="w-60" />
                        <div className="flex flex-col items-center">
                            <h2 className="text-lg font-semibold text-zinc-800">Nenhuma rota disponível</h2>
                            <span className="text-sm text-gray-500">Nenhuma rota disponível para entrega</span>
                        </div>
                    </div>
                )}
            </div>
            <ConfirmModal open={open} setOpen={setOpen} />
        </>
    )
}