import { CreatePointCredential, FuellingPoint, UpdatePointCredential } from '@/@types/organization/fuellingPoint';
import { createFuelPointApi, deleteFuelPointsApi, getPointsApi, updateFuelPointApi } from '@/services/fuel_suplier/FuelPointsService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export type FuelPointsState = FuellingPoint[]

const initialState: FuelPointsState = []

const SLICE_NAME = 'fuelPoints';


export const fetchFuelPoints = createAsyncThunk(
    SLICE_NAME + '/fetch',
    async () => {
        const response = await getPointsApi()
        return response.data
})

export const createFuelPoint = createAsyncThunk(
    SLICE_NAME + '/add',
    async (data: CreatePointCredential) => {
        const response = await createFuelPointApi(data)
        return response.data
})

export const updateFuelPoint = createAsyncThunk(
    SLICE_NAME + '/add',
    async (data: UpdatePointCredential) => {
        const response = await updateFuelPointApi(data)
        return response.data
})

export const deleteFuelPoint = createAsyncThunk(
    SLICE_NAME + '/delete',
    async (id: number) => {
        await deleteFuelPointsApi({id})
        return id
})



const FuelPointSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchFuelPoints.fulfilled, (state, action) => {
            return action.payload.data.fuellingPoints
          })
          .addCase(createFuelPoint.fulfilled, (state, action) => {
            const newFuelPoint = action.payload.data.fuellingPoint;
            return [...state, newFuelPoint];
          })
          // .addCase(updateFuelPoint.fulfilled, (state, action) => {
          //     const newFuelPoint = action.payload.data.fuellingPoint;
          //     return state.map(p => (p.id === newFuelPoint.id ? newFuelPoint : p));
          // })
        
          .addCase(deleteFuelPoint.fulfilled, (state, action) => {
            return state.filter((p) => p.id !== action.payload);
          });
    },
})

export default FuelPointSlice.reducer