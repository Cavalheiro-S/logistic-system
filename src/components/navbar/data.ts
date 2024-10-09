export const navItems: NavItem[] = [
    {
        title: "Produto",
        visible: true,
        children: [
            {
                title: "Cadastrar",
                description: "Cadastre seus produtos",
                path: "/product/create",
                visible: true,
            },
            {
                title: "Listar",
                description: "Liste seus produtos",
                path: "/product/view",
                visible: true,
            }
        ]
    },
    {
        title: "Pedido",
        visible: true,
        children: [
            {
                title: "Cadastrar",
                description: "Cadastre seus pedidos",
                path: "/order/create",
                visible: true,
            },
            {
                title: "Listar",
                description: "Liste seus pedidos",
                path: "/order/view",
                visible: true,
            }
        ]
    },
    {
        title: "Veículo",
        visible: true,
        children: [
            {
                title: "Cadastrar",
                description: "Cadastre seus veículos",
                path: "/vehicle/create",
                visible: true,
            },
            {
                title: "Listar",
                description: "Liste seus veículos",
                path: "/vehicle/view",
                visible: true,
            }
        ],
    },
    {
        title: "Motorista",
        visible: true,
        children: [
            {
                title: "Cadastrar",
                description: "Cadastre seus motoristas",
                path: "/driver/create",
                visible: true,
            },
            {
                title: "Listar",
                description: "Liste seus motoristas",
                path: "/driver/view",
                visible: true,
            }
        ]
    },
    {
        title: "Usuário",
        visible: true,
        children: [
            {
                title: "Cadastrar",
                description: "Cadastre seus usuários",
                path: "/user/create",
                visible: true,
            },
            {
                title: "Listar",
                description: "Liste seus usuários",
                path: "/user/view",
                visible: true,
            }
        ]
    }
]