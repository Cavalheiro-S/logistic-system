import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { CarFront } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const CreateVehicle = () => {
    const formSchema = z.object({
        description: z.string().min(1, { message: "Descricão é obrigatório" }),
        plate: z.string().min(1, { message: "Placa é obrigatório" }),
        model: z.string().min(1, { message: "Modelo é obrigatório" }),
        brand: z.string().min(1, { message: "Marca é obrigatório" }),
        type: z.string().min(1, { message: "Tipo é obrigatório" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 p-8 bg-white rounded-md shadow-lg ">
                    <div className="flex items-center gap-2">
                        <CarFront size={24} />
                        <h2 className="text-2xl font-semibold">Cadasto de Veículos</h2>
                    </div>
                    <FormField
                        name="description"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Descrição</FormLabel>
                                <FormControl>
                                    <Input placeholder="Descrição do veículo" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="brand"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Marca</FormLabel>
                                <FormControl>
                                    <Input placeholder="Marca do veículo" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                        name="type"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>Tipo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Tipo do produto" {...field} />
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