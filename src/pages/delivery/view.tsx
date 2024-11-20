import { Button } from "@/components/ui/button"
import { useDelivery } from "@/hooks/queries/use-delivery"
import { useState } from "react"
import { UpdateDeliveryModal } from "./components/update-delivery-modal"
import { format } from "date-fns"
import { MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { DeliveryStatus } from "@/enum/delivery-status"
import EmptyData from "../../assets/empty_data.svg"

export const DeliveryView = () => {
    const { deliveries } = useDelivery()
    const [deliverySelected, setDeliverySelected] = useState<Delivery | null>(null)
    const [open, setOpen] = useState(false)

    const BADGE_VARIANT = {
        [DeliveryStatus.Pending]: "outline",
        [DeliveryStatus.Delivered]: "default",
        [DeliveryStatus.Cancelled]: "destructive",
    }



    const renderDelivery = (delivery: Delivery, index: number) => {
        return (
            <div key={`${delivery.veiculo.placa}-${delivery.usuario.email}-${index}`} className="flex-col p-4 text-sm border rounded-lg shadow-lg min-w-80">
                <Badge variant={BADGE_VARIANT[delivery.status as keyof typeof BADGE_VARIANT] as "outline" | "default" | "destructive" | "secondary" | undefined} className="self-end">
                    {delivery.status}
                </Badge>
                <div className="grid grid-cols-2">
                    <p className="col-span-2 mb-2 text-base font-semibold text-center">Informações da entrega:</p>
                    <div className="col-span-1">
                        <div>
                            <span className="text-sm font-semibold">Estado:</span> {delivery.endereco_Entrega.estado}
                        </div>
                        <div>
                            <span className="text-sm font-semibold">Cidade:</span> {delivery.endereco_Entrega.cidade}
                        </div>
                        <div>
                            <span className="text-sm font-semibold">Rua:</span> {delivery.endereco_Entrega.cep}
                        </div>
                        <div>
                            <span className="text-sm font-semibold">Bairro:</span> {delivery.endereco_Entrega.bairro}
                        </div>
                        <div>
                            <span className="text-sm font-semibold">Rua:</span> {delivery.endereco_Entrega.rua}
                        </div>
                    </div>
                    <div>
                        <div>
                            <span className="text-sm font-semibold">Data limite entrega:</span> {format(delivery.data_Entrega, "dd/MM/yyyy")}
                        </div>
                        <div>
                            <span className="text-sm font-semibold">Data estimativa entrega:</span> {format(delivery.estimativa_Entrega, "dd/MM/yyyy")}
                        </div>
                        <div>
                            <span className="text-sm font-semibold">Veículo:</span> {`${delivery.veiculo.placa} - ${delivery.veiculo.modelo} ${delivery.veiculo.capacidade}`}
                        </div>
                    </div>
                    <Button
                        className="col-span-2 place-self-end w-fit"
                        type="button"
                        onClick={() => {
                            setDeliverySelected(delivery)
                            setOpen(true)
                        }}>
                        Atualizar Entrega
                    </Button>
                </div>
            </div>
        )
    }
    return (
        <>
            <div className="flex items-center gap-2 mb-10">
                <MapPin size={32} />
                <div className="flex flex-col">
                    <h2 className="text-2xl font-semibold text-zinc-800">Rotas de viagem</h2>
                    <span className="text-gray-500">Escolhe uma rota de viagem entre as rotas disponíveis</span>
                </div>
            </div>
            <div className="flex gap-4">
                {
                    (deliveries && deliveries.length === 0) ? (
                        <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                            <img src={EmptyData} alt="Sem dados" className="w-60" />
                            <div className="flex flex-col items-center">
                                <p className="font-semibold">Nenhuma rota de viagem encontrada</p>
                                <p className="text-sm text-gray-500">Procure seu supervisor para adicionar novas rotas</p>
                            </div>
                        </div>
                    )
                        : (
                            deliveries?.map(renderDelivery)
                        )
                }

            </div>
            {deliverySelected && <UpdateDeliveryModal delivery={deliverySelected} setDeliverySelected={setDeliverySelected} open={open} setOpen={setOpen} />}
        </>
    )
}