import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { SquareChartGantt } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

export const CreateOrder = () => {

    const stockOptions = [{
        id: "1",
        label: "Estoque 1",
    },
    {
        id: "2",
        label: "Estoque 2",
    }]

    const statusOptions = [{
        id: "1",
        label: "Ativo",
    },
    {
        id: "2",
        label: "Inativo",
    }]

    const formSchema = z.object({
        stock: z.string().min(1),
        price: z.string().min(1, { message: "Preço é obrigatório" }),
        status: z.string().min(1, { message: "Status obrigatório" }),
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
                        <SquareChartGantt size={24} />
                        <h2 className="text-2xl font-semibold">Controle de Pedidos</h2>
                    </div>
                    <FormField
                        name="stock"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Estoque</FormLabel>
                                <Select {...field} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione um estoque" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {stockOptions.map((option) => (
                                            <SelectItem key={option.id} value={option.id}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="status"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Status</FormLabel>
                                <Select {...field} >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecione um status" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {statusOptions.map((option) => (
                                            <SelectItem key={option.id} value={option.id}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="price"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className="col-span-2">
                                <FormLabel>Preço</FormLabel>
                                <FormControl>
                                    <Input placeholder="Preço do produto" {...field} />
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