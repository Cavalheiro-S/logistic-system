import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RolesLabelEnum } from "@/enum/roles"
import { useUser } from "@/hooks/queries/use-user"
import { zodResolver } from "@hookform/resolvers/zod"
import { Select } from "@radix-ui/react-select"
import { Delete, Loader2, Save, UserPlus } from "lucide-react"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { z } from "zod"

interface ModalEditUserProps {
    user: User | null
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ModalEditUser = ({ open, setOpen, user }: ModalEditUserProps) => {

    const { mutationUpdateUser, mutationDeleteUser } = useUser()
    const navigate = useNavigate()
    const isLoading = mutationUpdateUser.isPending || mutationDeleteUser.isPending

    const formSchema = z.object({
        name: z.string().min(1, { message: "Nome é obrigatório" }),
        email: z.string().email({ message: "Email não é valido" }).min(1, { message: "Email é obrigatório" }),
        password: z.string().min(1, { message: "Senha é obrigatório" }),
        confirmPassword: z.string().min(1, { message: "Confirme sua senha" }),
        profile: z.string().min(1, { message: "Perfil é obrigatório" }),
    }).superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({ code: "custom", message: "As senhas devem ser iguais", path: ["confirmPassword"] })
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: user?.nome,
            email: user?.email,
            password: user?.senha,
            confirmPassword: "",
            profile: user?.acesso,
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const mapData: User = {
                nome: values.name,
                email: values.email,
                senha: values.password,
                acesso: values.profile
            }
            await mutationUpdateUser.mutateAsync(mapData)
            toast.success('Usuário atualizado com sucesso!')
            setOpen(false)
            navigate("/user/view")
        }
        catch (error) {
            console.error(error)
        }
    }

    const profileOptions = Object.entries(RolesLabelEnum).map(([, value]) => ({ value, label: value }))

    useEffect(() => {
        if (user) {
            form.setValue("name", user.nome)
            form.setValue("email", user.email)
            form.setValue("password", user.senha)
            form.setValue("profile", user.acesso)
        }
    }, [form, user])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-2">
                        <UserPlus size={24} />
                        <h2 className="text-2xl font-semibold">Atualizar Usuário</h2>
                    </div>
                </DialogHeader>
                <DialogFooter>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 p-8">

                            <FormField
                                name="name"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nome do usuário" {...field} />
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
                                            <Input type="email" placeholder="E-mail do usuário" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="password"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel>Senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="confirmPassword"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel>Confirme a senha</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="********" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                name="profile"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="col-span-1">
                                        <FormLabel>Perfil</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value} >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione um perfil" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {profileOptions.map((option, index) => (
                                                    <SelectItem key={option.label + index} value={option.value}>
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-between w-full col-span-2">
                                <Button
                                    onClick={async () => {
                                        try {
                                            if (user) {

                                                form.reset()
                                                setOpen(false)
                                                await mutationDeleteUser.mutateAsync(user.nome)
                                                toast.success("Usuário deletado com sucesso")
                                            }
                                        }
                                        catch (error) {
                                            console.error(error)
                                            toast.error("Não foi possível criar usuário")
                                        }
                                    }}
                                    disabled={isLoading}
                                    variant={"outline"}
                                    className=""
                                    type="button">
                                    {
                                        mutationDeleteUser.isPending ? (
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        ) : (
                                            <Delete className="w-4 h-4 mr-2" />
                                        )
                                    }
                                    Deletar
                                </Button>
                                <Button className="" type="submit">
                                    {
                                        mutationUpdateUser.isPending ? (
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