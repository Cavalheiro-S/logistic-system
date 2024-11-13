import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAdress } from "@/hooks/queries/use-adress"
import { zodResolver } from "@hookform/resolvers/zod"
import { Delete, Loader2, MapPinHouse, Save } from "lucide-react"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { z } from "zod"

interface ModalEditAdressProps {
    adress: Adress | null
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalEditAdress = ({ open, setOpen, adress }: ModalEditAdressProps) => {

    const { mutationUpdateAdress, mutationDeleteAdress } = useAdress()
    const navigate = useNavigate()
    const isLoading = mutationUpdateAdress.isPending || mutationDeleteAdress.isPending

    const formSchema = z.object({
        street: z.string().min(1, { message: "Rua é obrigatório" }),
        neighborhood: z.string().min(1, { message: "Bairro é obrigatório" }),
        city: z.string().min(1, { message: "Cidade é obrigatório" }),
        state: z.string().min(1, { message: "Estado é obrigatório" }),
        cep: z.string().min(1, { message: "CEP é obrigatório" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            street: adress?.rua,
            neighborhood: adress?.bairro,
            city: adress?.cidade,
            state: adress?.estado,
            cep: adress?.cep,
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const mapData: Adress = {
                rua: values.street,
                bairro: values.neighborhood,
                cidade: values.city,
                estado: values.state,
                cep: values.cep
            }
            await mutationUpdateAdress.mutateAsync(mapData)
            toast.success('Endereço atualizado com sucesso!')
            setOpen(false)
            navigate("/adress/view")
        }
        catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (adress) {
            form.setValue("street", adress.rua)
            form.setValue("cep", adress.cep)
            form.setValue("city", adress.cidade)
            form.setValue("state", adress.estado)
            form.setValue("neighborhood", adress.bairro)
        }
    }, [form, adress])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <MapPinHouse size={24} />
                        <h2 className="text-2xl font-semibold">Atualizar Endereço</h2>
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 p-8">

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
                            <div className="flex justify-between w-full col-span-2">
                                <Button
                                    onClick={async () => {
                                        try {
                                            if (adress) {

                                                form.reset()
                                                setOpen(false)
                                                await mutationDeleteAdress.mutateAsync(adress)
                                                toast.success("Endereço deletado com sucesso")
                                            }
                                        }
                                        catch (error) {
                                            console.error(error)
                                            toast.error("Não foi possível criar endereço")
                                        }
                                    }}
                                    disabled={isLoading}
                                    variant={"outline"}
                                    className=""
                                    type="button">
                                    {
                                        mutationDeleteAdress.isPending ? (
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        ) : (
                                            <Delete className="w-4 h-4 mr-2" />
                                        )
                                    }
                                    Deletar
                                </Button>
                                <Button className="" type="submit">
                                    {
                                        mutationUpdateAdress.isPending ? (
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
    )
}