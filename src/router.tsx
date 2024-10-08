import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { CreateDriver } from "./pages/driver/create";
import { ViewDriver } from "./pages/driver/view";
import { CreateOrder } from "./pages/order/create";
import { ViewOrder } from "./pages/order/view";
import { CreateProduct } from "./pages/product/create";
import { ViewProduct } from "./pages/product/view";
import { CreateUser } from "./pages/user/create";
import { ViewUser } from "./pages/user/view";
import { CreateVehicle } from "./pages/vehicle/create";
import { ViewVehicle } from "./pages/vehicle/view";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "product",
                children: [
                    {
                        path: "create",
                        element: <CreateProduct />
                    },
                    {
                        path: "view",
                        element: <ViewProduct />
                    }
                ]
            },
            {
                path: "user",
                children: [
                    {
                        path: "create",
                        element: <CreateUser />
                    },
                    {
                        path: "view",
                        element: <ViewUser />
                    }
                ]
            },
            {
                path: "driver",
                children: [
                    {
                        path: "create",
                        element: <CreateDriver />
                    },
                    {
                        path: "view",
                        element: <ViewDriver />
                    }
                ]
            },
            {
                path: "order",
                children: [
                    {
                        path: "create",
                        element: <CreateOrder />
                    },
                    {
                        path: "view",
                        element: <ViewOrder />
                    }
                ]
            },
            {
                path: "vehicle",
                children: [
                    {
                        path: "create",
                        element: <CreateVehicle />
                    },
                    {
                        path: "view",
                        element: <ViewVehicle />
                    }
                ]
            }
        ]
    },
])