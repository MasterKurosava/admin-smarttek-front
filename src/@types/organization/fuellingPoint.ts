export type FuellingPoint = {
    id: number;
    organization_id: number | undefined,
    long: number;
    lat: number;
    address: string;
    location_id: number;
    name: string;
    start_time: string;
    end_time: string;
}


export type AddPointsCredential = {
    organization_id : number | undefined,
    long: number
    lat : number
    address : string
    location_id : number
    name : string;
    start_time : string
    end_time : string
}

export type GetPointsResponse = {
    data: FuellingPoint[]
}
export type GetPointResponse = {
    data: FuellingPoint
}