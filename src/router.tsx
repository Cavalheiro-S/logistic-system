import { createBrowserRouter, Link } from "react-router-dom";
import { Layout } from "./components/layout";
import { Button } from "./components/ui/button";
import { CreateAdress } from "./pages/adress/create";
import { ViewAdress } from "./pages/adress/view";
import SignIn from "./pages/sign-in";
import { CreateUser } from "./pages/user/create";
import { ViewUser } from "./pages/user/view";
import { CreateVehicle } from "./pages/vehicle/create";
import { ViewVehicle } from "./pages/vehicle/view";
import ProtectedRoute from "./utils/protected-route";
import { DeliveryChoose } from "./pages/delivery/choose";
import { DeliveryView } from "./pages/delivery/view";
import Home from "./pages/home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl"> Bem vindo ao sistema de logística</span>
                    <Link to={"/signin"}>
                        <Button>
                            Acessar o Sistema
                        </Button>
                    </Link>
                </div>
            },
            {
                path: "signin",
                element: <SignIn />
            },
            {
                path: "home",
                element:
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
            },
            {
                path: "adress",
                children: [
                    {
                        path: "create",
                        element:
                            <ProtectedRoute>
                                <CreateAdress />
                            </ProtectedRoute>

                    },
                    {
                        path: "view",
                        element:
                            <ProtectedRoute>
                                <ViewAdress />
                            </ProtectedRoute>
                    }
                ]
            },
            {
                path: "user",
                children: [
                    {
                        path: "create",
                        element:
                            <ProtectedRoute>
                                <CreateUser />
                            </ProtectedRoute>
                    },
                    {
                        path: "view",
                        element:
                            <ProtectedRoute>
                                <ViewUser />
                            </ProtectedRoute>
                    }
                ]
            },
            {
                path: "vehicle",
                children: [
                    {
                        path: "create",
                        element:
                            <ProtectedRoute>
                                <CreateVehicle />
                            </ProtectedRoute>
                    },
                    {
                        path: "view",
                        element:
                            <ProtectedRoute>
                                <ViewVehicle />
                            </ProtectedRoute>
                    }
                ]
            },
            {
                path: "delivery",
                children: [
                    {
                        path: "choose",
                        element:
                            <ProtectedRoute>
                                <DeliveryChoose />
                            </ProtectedRoute>
                    },
                    {
                        path: "view",
                        element:
                            <ProtectedRoute>
                                <DeliveryView />
                            </ProtectedRoute>
                    },
                ]
            }
        ]
    },
])
