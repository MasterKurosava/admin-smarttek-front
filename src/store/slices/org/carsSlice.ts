import { AddCarCredential, Car, CarResponse } from '@/@types/organization/car';
import { addCarApi, attachCarApi, deleteCarApi, getCarsApi } from '@/services/owner/CarsServise';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { object } from 'yup';

type AttachCarPayload = {
    c_id: number;
    u_id: number;
};

export type CarsState = Car[]

const initialState: CarsState = []

const SLICE_NAME = 'orgCars';


export const fetchCars = createAsyncThunk(
    SLICE_NAME + '/fetch',
    async () => {
        const response = await getCarsApi()
        return response.data
})

export const addCar = createAsyncThunk(
    SLICE_NAME + '/add',
    async (data: AddCarCredential) => {
        const response = await addCarApi(data)
        return response.data
})

export const deleteCar = createAsyncThunk(
    SLICE_NAME + '/delete',
    async (id: number) => {
        await deleteCarApi(id)
        return id
})


export const attachCar = createAsyncThunk(
    SLICE_NAME + '/attach',
    async ({c_id, u_id}: AttachCarPayload) => { 
        const response = await attachCarApi(c_id, u_id);
    }
);


const CarsSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCars.fulfilled, (state, action) => {
            return action.payload.data
        })
        .addCase(addCar.fulfilled, (state, action) => {
            
            return [...state, {
                id: action.payload.data.id,
                car:{...action.payload.data}
            }]
        })
        .addCase(deleteCar.fulfilled, (state, action) => {
            return state.filter(car => car.id !== action.payload)
        });
    },
})

export default CarsSlice.reducer