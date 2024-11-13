import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useVehicle } from "@/hooks/queries/use-vehicle"
import { DevTool } from "@hookform/devtools"
import { zodResolver } from "@hookform/resolvers/zod"
import { CarFront, Delete, Loader2, Save } from "lucide-react"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { z } from "zod"

interface ModalEditVehicleProps {
    vehicle: GetVehicleResponse | null
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalEditVehicle = ({ open, setOpen, vehicle }: ModalEditVehicleProps) => {
    const { mutationUpdateVehicle, mutationDeleteVehicle } = useVehicle()
    const isLoading = mutationUpdateVehicle.isPending || mutationDeleteVehicle.isPending

    // Esquema de validação condicional baseado no vehicle
    const formSchema = z.object({
        plate: z.string().optional(),
        model: z.string().min(1, { message: "Modelo é obrigatório" }),
        capacity: z.string().min(1, { message: "Capacidade é obrigatório" }),
        status: z.string().min(1, { message: "Status é obrigatório" }),
    })

    const navigate = useNavigate()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            plate: "",
            model: "",
            capacity: "0",
            status: "",
        }
    })

    const { handleSubmit, reset, control, setValue } = form

    // Atualiza os valores do formulário quando vehicle mudar
    useEffect(() => {
        if (vehicle) {
            setValue("plate", vehicle.placa)
            setValue("model", vehicle.modelo)
            setValue("capacity", vehicle.capacidade.toString())
            setValue("status", vehicle.status)

        }
    }, [vehicle, setValue])

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if(!values.plate) {
                toast.error('Placa é obrigatório!')
                return
            }
            const mapData: UpdateVehicleRequest = {
                capacidade: parseInt(values.capacity),
                placa: values.plate,
                modelo: values.model,
                status: values.status,
            }
            await mutationUpdateVehicle.mutateAsync(mapData)
            setOpen(false)
            toast.success('Veiculo atualizado com sucesso!')
            navigate("/vehicle/view")
        }
        catch (error) {
            console.error(error)
            toast.error('Erro ao atualizar veiculo!')
        }
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogTitle>
                        <div className="flex items-center gap-2">
                            <CarFront size={24} />
                            <h2 className="text-2xl font-semibold">Atualizar Veiculo</h2>
                        </div>
                    </DialogTitle>
                    <DialogFooter>
                        <Form {...form}>
                            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 p-8 ">
                                <FormField
                                    name="model"
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Modelo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Modelo do veículo" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="capacity"
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-2">
                                            <FormLabel>Capacidade</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Capacidade do veículo" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="plate"
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1">
                                            <FormLabel>Placa</FormLabel>
                                            <FormControl>
                                                <Input disabled={!!vehicle} placeholder="Placa do veículo" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1">
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Status do veículo" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-between w-full col-span-2">
                                    <Button
                                        onClick={async () => {
                                            try {
                                                if (vehicle) {
                                                    await mutationDeleteVehicle.mutateAsync(vehicle.placa)
                                                    toast.success("Veiculo deletado com sucesso")
                                                    reset()
                                                    setOpen(false)
                                                }
                                            }
                                            catch (error) {
                                                console.error(error)
                                                toast.error("Não foi possível deletar veiculo")
                                            }
                                        }}
                                        disabled={isLoading}
                                        variant={"outline"}
                                        className=""
                                        type="button">
                                        {
                                            mutationDeleteVehicle.isPending ? (
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            ) : (
                                                <Delete className="w-4 h-4 mr-2" />
                                            )
                                        }
                                        Deletar
                                    </Button>
                                    <Button className="" type="submit">
                                        {
                                            mutationUpdateVehicle.isPending ? (
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            ) : (
                                                <Save className="w-4 h-4 mr-2" />
                                            )
                                        }
                                        Atualizar
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <DevTool control={control} />
        </>
    )
}