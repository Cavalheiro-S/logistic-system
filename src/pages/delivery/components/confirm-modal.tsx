import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useVehicle } from "@/hooks/queries/use-vehicle"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select } from "@radix-ui/react-select"
import { BadgeCheck } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface ConfirmModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const ConfirmModal = ({ open, setOpen }: ConfirmModalProps) => {

    const { vehicles } = useVehicle()

    const formSchema = z.object({
        vehicle: z.string().min(1, { message: "Selecione um veículo" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            vehicle: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            console.log({ values });

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
                            <Button className="col-span-2" type="submit">Confirmar</Button>
                        </form>
                    </Form>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}