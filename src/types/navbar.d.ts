type NavItem = {
    title: string,
    visible: boolean,
    children: {
        title: string,
        description: string,
        path: string
        visible: boolean,
    }[]
}