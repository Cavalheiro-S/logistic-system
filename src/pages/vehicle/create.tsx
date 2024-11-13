import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useVehicle } from "@/hooks/queries/use-vehicle"
import { zodResolver } from "@hookform/resolvers/zod"
import { CarFront } from "lucide-react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { z } from "zod"

export const CreateVehicle = () => {
    const { mutationCreateVehicle } = useVehicle()
    const formSchema = z.object({
        plate: z.string().min(1, { message: "Placa é obrigatório" }),
        model: z.string().min(1, { message: "Modelo é obrigatório" }),
        capacity: z.string().min(1, { message: "Capacidade é obrigatório" }),
        status: z.string().min(1, { message: "Status é obrigatório" }),
    })
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const mapData: PostVehicleRequest = {
                capacidade: parseInt(values.capacity),
                placa: values.plate,
                modelo: values.model,
                status: values.status,
            }
            await mutationCreateVehicle.mutateAsync(mapData)
            toast.success('Veiculo criado com sucesso!')
            navigate("/vehicle/view")
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 p-8 bg-white rounded-md shadow-lg ">
                    <div className="flex items-center gap-2">
                        <CarFront size={24} />
                        <h2 className="text-2xl font-semibold">Cadastro de Veiculos</h2>
                    </div>
                    <FormField
                        name="model"
                        control={form.control}
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
                        control={form.control}
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
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>Placa</FormLabel>
                                <FormControl>
                                    <Input placeholder="Placa do veículo" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="status"
                        control={form.control}
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
                    <Button className="col-span-2" type="submit">Cadastrar</Button>
                </form>
            </Form>
        </div >
    )
}