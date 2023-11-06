import { User } from "../auth";

export type Car = {
    id: number,
    car:{
        id: number;
        region: string;
        registration_letters: string;
        registration_number: string;
        owner?: User
    }
}

export type SingleCar = {
    id: number;
    region: string;
    registration_letters: string;
    registration_number: string;
    owner?: User
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
    data: Car[]
}