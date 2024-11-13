type PostVehicleRequest = {
    placa: string
    modelo: string
    capacidade: number
    status: string
}

type UpdateVehicleRequest = {
    placa: string
    modelo: string
    capacidade: number
    status: string
}

type GetVehicleResponse = {
    placa: string
    modelo: string
    capacidade: number
    status: string
}