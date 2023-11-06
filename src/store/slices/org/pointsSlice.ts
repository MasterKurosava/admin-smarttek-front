import { User } from '@/@types/auth';
import { AddPointsCredential, FuellingPoint } from '@/@types/organization/fuellingPoint';
import { addPointApi, deletePointsApi, getPointsApi } from '@/services/owner/FuelingPointsServise';
import { getOrganizationUsersApi } from '@/services/owner/OrganizationService';
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

export const addPoint = createAsyncThunk(
    SLICE_NAME + '/add',
    async (data: AddPointsCredential) => {
        const response = await addPointApi(data)
        return response.data
})

export const deletePoint = createAsyncThunk(
    SLICE_NAME + '/delete',
    async (id: number) => {
        await deletePointsApi(id)
        return id
})

const PointsSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPoints.fulfilled, (state, action) => {
            return action.payload.data
        })
        .addCase(addPoint.fulfilled, (state, action) => {
            return [...state, action.payload.data]
        })
        .addCase(deletePoint.fulfilled, (state, action) => {
            return state.filter(car=>car.id!==action.payload)
        })
    },
})

export default PointsSlice.reducer