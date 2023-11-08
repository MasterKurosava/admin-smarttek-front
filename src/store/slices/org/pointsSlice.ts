import { FuellingPoint } from '@/@types/organization/fuellingPoint';
import {getPointsApi } from '@/services/organization/FuelingPointsServise';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type PointsState = FuellingPoint[]

const initialState: PointsState = []

const SLICE_NAME = 'orgPoints';


export const fetchPoints= createAsyncThunk(
    SLICE_NAME + '/fetch',
    async () => {
    
    // assume someService required reesponse & require type as generic
    const response = await getPointsApi()
    return response.data
})


const PointsSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPoints.fulfilled, (state, action) => {
            return action.payload.data.fuellingPoints
        })
    },
})

export default PointsSlice.reducer