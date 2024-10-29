import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RolesLabelEnum } from "@/enum/roles"
import { useUser } from "@/hooks/queries/use-user"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserPlus } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { v4 as uuidv4 } from 'uuid';
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

export const CreateUser = () => {
    const { mutationCreateUser } = useUser()
    const navigate = useNavigate()

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
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            profile: RolesLabelEnum.DRIVER,
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const mapData: User = {
                id: uuidv4(),
                nome: values.name,
                email: values.email,
                senha: values.password,
                acesso: values.profile
            }
            await mutationCreateUser.mutateAsync(mapData)
            toast.success('Usuário criado com sucesso!')
            navigate("/user/view")
        }
        catch (error) {
            console.error(error)
        }
    }

    const profileOptions = Object.entries(RolesLabelEnum).map(([, value]) => ({ value, label: value }))

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 p-8 bg-white rounded-md shadow-lg ">
                    <div className="flex items-center gap-2">
                        <UserPlus size={24} />
                        <h2 className="text-2xl font-semibold">Cadastro de Usuário</h2>
                    </div>
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
                    <Button className="col-span-2" type="submit">Cadastrar</Button>
                </form>
            </Form>
        </div >
    )
}