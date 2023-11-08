import { User } from "../auth";

export type Car = {
    id: number;
    region: string;
    registration_letters: string;
    registration_number: string;
    // owner?: User
    organization_id: number,
    owner_id: number,
}

export type SingleCar = {
    id: number;
    region: string;
    registration_letters: string;
    registration_number: string;
    organization_id: number,
    owner_id: number,
}

export type AddCarCredential = {
    region: string;
    registration_letters: string;
    registration_number: string;
}

export type CarResponse = {
    data: Car
}

export type CarsResponse = {
    success: boolean,
    code: number,
    message: string | null,
    data: {
        cars: Car[]
    }
}