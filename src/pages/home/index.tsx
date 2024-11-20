import { Button } from "@/components/ui/button"
import { RolesLabelEnum } from "@/enum/roles"
import { Warehouse } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Home = () => {
    const [role,] = useState(localStorage.getItem("role"))
    const navigate = useNavigate()

    return (

        <div className="flex flex-col w-full h-full gap-4">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center gap-4">
                    <Warehouse className="text-primary" size={80} />
                    <h1 className="text-2xl font-bold">Bem vindo ao sistema de entregas</h1>
                    {role === RolesLabelEnum.ADMIN
                        ? <p>Aqui você pode gerenciar as entregas</p>
                        : <p>Aqui você pode gerenciar suas entregas</p>
                    }
                    {
                        role === RolesLabelEnum.ADMIN
                            ? <Button onClick={() => navigate("/adress/create")}>Crie uma nova entrega</Button>
                            : <Button onClick={() => navigate("/delivery/view")}>Acesse suas entregas</Button>
                    }
                </div>
            </div>
        </div>
    )
}
export default Home