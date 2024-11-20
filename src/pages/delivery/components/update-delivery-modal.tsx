import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DeliveryStatus } from "@/enum/delivery-status"
import { useDelivery } from "@/hooks/queries/use-delivery"
import { useVehicle } from "@/hooks/queries/use-vehicle"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select } from "@radix-ui/react-select"
import { addDays, format } from "date-fns"
import { BadgeCheck, CalendarIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"

interface UpdateDeliveryModalProps {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setDeliverySelected: React.Dispatch<React.SetStateAction<Delivery | null>>
    delivery: Delivery
}

export const UpdateDeliveryModal = ({ open, setOpen, delivery, setDeliverySelected }: UpdateDeliveryModalProps) => {

    const { mutationUpdateDelivery } = useDelivery()
    const { vehicles } = useVehicle()
    const [user, setUser] = useState<User>()


    useEffect(() => {
        const userJSON = localStorage.getItem("user")
        if (userJSON) {
            setUser(JSON.parse(userJSON) as User)
        }
    }, [])

    const formSchema = z.object({
        vehicle: z.object({
            placa: z.string().min(1, { message: "Selecione uma placa" }),
            modelo: z.string().min(1, { message: "Selecione um modelo" }),
            capacidade: z.number().min(1, { message: "Selecione uma capacidade" }),
            status: z.string().min(1, { message: "Selecione um status" }),
        }),
        adress: z.object({
            cep: z.string().min(1, { message: "Selecione um cep" }),
            rua: z.string().min(1, { message: "Selecione uma rua" }),
            bairro: z.string().min(1, { message: "Selecione um bairro" }),
            cidade: z.string().min(1, { message: "Selecione uma cidade" }),
            estado: z.string().min(1, { message: "Selecione um estado" }),
        }),
        estimated_time: z.date().default(addDays(new Date(), 1)),
        delivery_date: z.date().default(addDays(new Date(), 1)),
        status: z.string().min(1, { message: "Selecione um status" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vehicle: delivery.veiculo,
            adress: delivery.endereco_Entrega,
            delivery_date: addDays(new Date(), 4),
            estimated_time: new Date(delivery?.estimativa_Entrega),
            status: delivery.status,
        }
    })
    const { watch, control, reset, setValue } = form

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {

            if (!values.vehicle) {
                toast.error("Veículo não encontrado")
                return
            }
            if (!user) {
                toast.error("Usuário não encontrado")
                return
            }
            if (values.estimated_time > values.delivery_date) {
                toast.error("Data de entrega não pode ser menor que a data estimada")
                return
            }

            const body: Delivery = {
                veiculo: values.vehicle,
                endereco_Entrega: values.adress,
                usuario: user,
                data_Entrega: values.delivery_date.toISOString(),
                estimativa_Entrega: values.estimated_time.toISOString(),
                status: values.status,
            }
            await mutationUpdateDelivery.mutateAsync(body)
            reset()
            setOpen(false)
            toast.success("Rota de entrega atualizada")

        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (delivery) {
            setValue("vehicle", delivery.veiculo)
            setValue("adress", delivery.endereco_Entrega)
            setValue("delivery_date", new Date(delivery.data_Entrega))
            setValue("estimated_time", new Date(delivery.estimativa_Entrega))
            setValue("status", delivery.status)
        }
    }, [delivery, setValue])

    const statusOptions = Object.entries(DeliveryStatus).map(([, value]) => ({ value, label: value }))

    return (
        <Dialog open={open} onOpenChange={open => {
            if (!open) {
                reset()
                setDeliverySelected(null)
            }
            setOpen(open)
        }}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <BadgeCheck size={40} className="text-primary" />
                        <div className="flex flex-col gap-1">
                            <DialogTitle>Confirme o veículo</DialogTitle>
                            <DialogDescription>
                                Para confirmar a escolha da rota , escolha um veículo e clique em confirmar
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-6 p-8 rounded-md">
                            <FormField
                                name="vehicle"
                                control={control}
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel>Veículo</FormLabel>
                                        <Select disabled onValueChange={field.onChange} defaultValue={field.value.placa} >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione um veículo" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {vehicles?.map(option => (
                                                    <SelectItem key={option.placa} value={option.placa}>
                                                        {`${option.placa} - ${option.modelo} - ${option.status}`}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-2">
                                <FormLabel htmlFor="delivery_date">Data de entrega</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            disabled
                                            id="delivery_date"
                                            variant={"outline"}
                                        >
                                            <CalendarIcon className="w-4 h-4 mr-2" />
                                            {watch("delivery_date") ? format(watch("delivery_date"), "dd/MM/yyyy") : <span>Escolha uma data</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <FormField
                                            name="delivery_date"
                                            control={control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(date) => field.onChange(date)}
                                                        disabled={(date) => date < new Date()}
                                                        initialFocus
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="flex flex-col gap-2">
                                <FormLabel htmlFor="estimated_time">Data de entrega estimada</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="estimated_time"
                                            variant={"outline"}
                                        >
                                            <CalendarIcon className="w-4 h-4 mr-2" />
                                            {watch("estimated_time") ? format(watch("estimated_time"), "dd/MM/yyyy") : <span>Escolha uma data</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <FormField
                                            name="estimated_time"
                                            control={control}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={(date) => field.onChange(date)}
                                                        disabled={(date) => date < new Date()}
                                                        initialFocus
                                                    />
                                                </FormItem>
                                            )}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div>
                                <FormField
                                    name="status"
                                    control={control}
                                    render={({ field }) => (
                                        <FormItem className="col-span-1">
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value} >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione um veículo" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {statusOptions?.map(option => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {`${option.label}`}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button className="col-span-2" type="submit">Confirmar</Button>
                        </form>
                    </Form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}