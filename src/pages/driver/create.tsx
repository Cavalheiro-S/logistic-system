import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserRoundPlus } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const CreateDriver = () => {

    const formSchema = z.object({
        name: z.string().min(1, { message: "Nome é obrigatório" }),
        email: z.string().email({ message: "Email não é valido" }).min(1, { message: "Email é obrigatório" }),
        phone: z.string().min(1, { message: "Número de telefone é obrigatório" }),
        cpf: z.string().min(1, { message: "CPF é obrigatório" }),
        re: z.string().min(1, { message: "RE é obrigatório" }),
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 p-8 bg-white rounded-md shadow-lg ">
                    <div className="flex items-center gap-2">
                        <UserRoundPlus size={24} />
                        <h2 className="text-2xl font-semibold">Cadasto de Motorista</h2>
                    </div>
                    <FormField
                        name="name"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nome do motorista" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>E-mail</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="phone"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                    <Input placeholder="Telefone" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="cpf"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>CPF</FormLabel>
                                <FormControl>
                                    <Input placeholder="CPF do motorista" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="re"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-1">
                                <FormLabel>RE</FormLabel>
                                <FormControl>
                                    <Input placeholder="RE do motorista" {...field} />
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