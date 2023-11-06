import { Location } from '@/@types/organization/location';
import { getLocationsApi } from '@/services/default/locationsServise';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type LocationsState = Location[]

const initialState: LocationsState = []

const SLICE_NAME = 'orgLocations';


export const fetchLocations = createAsyncThunk(
    SLICE_NAME + '/fetch',
    async () => {
        const response = await getLocationsApi()
        return response.data
})



const LocationsSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchLocations.fulfilled, (state, action : any) => {
            return action.payload.data
        })
    },
})

export default LocationsSlice.reducer