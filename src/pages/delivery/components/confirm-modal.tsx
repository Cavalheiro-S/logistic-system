import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDelivery } from "@/hooks/queries/use-delivery"
import { useVehicle } from "@/hooks/queries/use-vehicle"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select } from "@radix-ui/react-select"
import { addDays, differenceInCalendarDays, format } from "date-fns"
import { BadgeCheck, CalendarIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { z } from "zod"
interface ConfirmModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    adress: Adress | null
}

export const ConfirmModal = ({ open, setOpen, adress }: ConfirmModalProps) => {

    const { mutationCreateDelivery, deliveries } = useDelivery()
    const { vehicles } = useVehicle()
    const [user, setUser] = useState<User>()


    useEffect(() => {
        const userJSON = localStorage.getItem("user")
        if (userJSON) {
            setUser(JSON.parse(userJSON) as User)
        }
    }, [])

    const formSchema = z.object({
        vehicle: z.string().min(1, { message: "Selecione um veículo" }),
        estimated_time: z.date().default(addDays(new Date(), 1)),
        delivery_date: z.date().default(addDays(new Date(), 1)),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vehicle: "",
            delivery_date: addDays(new Date(), 4),
            estimated_time: addDays(new Date(), 4),
        }
    })
    const { watch } = form

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const vehicleSelected = vehicles?.find(vehicle => vehicle.placa === values.vehicle)

            if(deliveries && deliveries?.length> 0) {
                toast.error("Já existe uma entrega em andamento")
                return
            }

            if (!vehicleSelected) {
                toast.error("Veículo não encontrado")
                return
            }
            if (!adress) {
                toast.error("Endereço não encontrado")
                return
            }
            if (!user) {
                toast.error("Usuário não encontrado")
                return
            }
            if (differenceInCalendarDays(values.estimated_time, values.delivery_date)  > 0) {
                toast.error("Data estipulada não pode ser maior que a data estimada de entrega")
                return
            }
            const body: Delivery = {
                veiculo: vehicleSelected,
                endereco_Entrega: adress,
                usuario: user,
                data_Entrega: values.delivery_date.toISOString(),
                estimativa_Entrega: values.estimated_time.toISOString(),
                status: "Não iniciado",
            }
            await mutationCreateDelivery.mutateAsync(body)
            setOpen(false)
            toast.success("Rota de entrega escolhida")

        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel>Veículo</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} >
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
                                            control={form.control}
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
                                            control={form.control}
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
                            <Button className="col-span-2" type="submit">Confirmar</Button>
                        </form>
                    </Form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}