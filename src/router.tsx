import { createBrowserRouter, Link } from "react-router-dom";
import { Layout } from "./components/layout";
import { CreateDriver } from "./pages/driver/create";
import { ViewDriver } from "./pages/driver/view";
import { Home } from "./pages/home";
import { CreateOrder } from "./pages/order/create";
import { ViewOrder } from "./pages/order/view";
import { CreateProduct } from "./pages/product/create";
import { ViewProduct } from "./pages/product/view";
import SignIn from "./pages/sign-in";
import { CreateUser } from "./pages/user/create";
import { ViewUser } from "./pages/user/view";
import { CreateVehicle } from "./pages/vehicle/create";
import { ViewVehicle } from "./pages/vehicle/view";
import ProtectedRoute from "./utils/protected-route";
import { Button } from "./components/ui/button";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <div className="flex flex-col items-center gap-2">
                    <span className="text-2xl"> Bem vindo ao sistema de logística</span> 
                    <Link to={"signin"}>
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
                path: "product",
                children: [
                    {
                        path: "create",
                        element:
                            <ProtectedRoute>
                                <CreateProduct />
                            </ProtectedRoute>

                    },
                    {
                        path: "view",
                        element:
                            <ProtectedRoute>
                                <ViewProduct />
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
                path: "driver",
                children: [
                    {
                        path: "create",
                        element:
                            <ProtectedRoute>

                                <CreateDriver />
                            </ProtectedRoute>
                    },
                    {
                        path: "view",
                        element:
                            <ProtectedRoute>
                                <ViewDriver />
                            </ProtectedRoute>
                    }
                ]
            },
            {
                path: "order",
                children: [
                    {
                        path: "create",
                        element:
                            <ProtectedRoute>
                                <CreateOrder />
                            </ProtectedRoute>
                    },
                    {
                        path: "view",
                        element:
                            <ProtectedRoute>
                                <ViewOrder />
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
            }
        ]
    },
])
