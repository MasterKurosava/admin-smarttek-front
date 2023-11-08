export type FuellingPoint = {
    [x: string]: any;
    id: number;
    fuel_supplier_id: number,
    long: number;
    lat: number;
    address: string;
    location_id: number;
    name: string;
    start_time: string;
    end_time: string;
}


export type CreatePointCredential = {
    long: number
    lat : number
    address : string
    location_id : number
    name : string;
    start_time : string
    end_time : string
}

export type UpdatePointCredential = {
    id: number
    long: number
    lat : number
    address : string
    location_id : number
    name : string;
    start_time : string
    end_time : string
}

export type GetPointsResponse = {
    data: {
        fuellingPoints:FuellingPoint[]
    }
}
export type CreatePointResponse = {
    data: {
        fuellingPoint:FuellingPoint
    }
}

export type UpdatePointResponse = {
    data: {
        fuellingPoint:FuellingPoint
    }
}
export type GetPointResponse = {
    data: FuellingPoint
}