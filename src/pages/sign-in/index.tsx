import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { Warehouse } from "lucide-react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { z } from "zod"

const SignIn = () => {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const formSchema = z.object({
        email: z.string().email({ message: "Email não é valido" }).min(1, { message: "Email é obrigatório" }),
        password: z.string().min(1, { message: "Senha é obrigatório" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    useEffect(() => {
        if(isAuthenticated()) {
            navigate("/home")
        }
    }, [isAuthenticated])

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        try {
            console.log(values)
            login()
            window.location.reload()
            navigate("/home")
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="flex flex-col items-center gap-2">
            <Warehouse className="text-primary" size={80} />
            <h2 className="text-2xl font-semibold">Bem vindo de volta</h2>
            <span className="block mb-2 text-sm text-gray-500">Faça login e comece a usar</span>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-72">
                    <FormField
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Endereço de e-mail</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="Email" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="********" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button>Entrar na plataforma</Button>
                </form>
            </Form>
        </div>
    )
}

export default SignIn