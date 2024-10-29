import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRoundPlus } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { v4 as uuidv4 } from 'uuid';
import { useAdress } from "@/hooks/queries/use-adress"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const CreateAdress = () => {
    const { mutationCreateAdress } = useAdress()
    const navigate = useNavigate()
    
    const formSchema = z.object({
        street: z.string().min(1, { message: "Rua é obrigatório" }),
        neighborhood: z.string().min(1, { message: "Bairro é obrigatório" }),
        city: z.string().min(1, { message: "Cidade é obrigatório" }),
        state: z.string().min(1, { message: "Estado é obrigatório" }),
        cep: z.string().min(1, { message: "CEP é obrigatório" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const mapData: Adress = {
                id: uuidv4(),
                rua: values.street,
                bairro: values.neighborhood,
                cidade: values.city,
                estado: values.state,
                cep: values.cep
            }
            await mutationCreateAdress.mutateAsync(mapData)
            toast.success('Endereço criado com sucesso!')
            navigate("/adress/view")
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 p-8 bg-white rounded-md shadow-lg ">
                    <div className="flex items-center gap-2">
                        <UserRoundPlus size={24} />
                        <h2 className="text-2xl font-semibold">Cadasto de Endereço</h2>
                    </div>
                    <FormField
                        name="street"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Rua</FormLabel>
                                <FormControl>
                                    <Input placeholder="Rua" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="neighborhood"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Bairro</FormLabel>
                                <FormControl>
                                    <Input placeholder="Bairro" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="city"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>Cidade</FormLabel>
                                <FormControl>
                                    <Input placeholder="Cidade" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="state"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                    <Input placeholder="Estado" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="cep"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>CEP</FormLabel>
                                <FormControl>
                                    <Input placeholder="CEP" {...field} />
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