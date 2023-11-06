// import { User } from '@/@types/auth';
// import { getOrganizationUsersApi } from '@/services/owner/OrganizationService';
// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// export type OrganizationState = User[]

// const initialState: OrganizationState = []

// export const SLICE_NAME = 'organization';


// export const fetchUsers = createAsyncThunk(
//     SLICE_NAME + '/fetch',
//     async () => {
//     // assume someService required reesponse & require type as generic
//     const response = await getOrganizationUsersApi()
//     return response.data
// })

// const UsersSlice = createSlice({
//     name: SLICE_NAME,
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(fetchUsers.fulfilled, (state, action) => {
//             return action.payload.data
//         })
//     },
// })

// export default UsersSlice.reducer