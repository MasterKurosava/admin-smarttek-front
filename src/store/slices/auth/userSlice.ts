import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SLICE_BASE_NAME } from './constants'
import { UserToken } from '@/@types/auth';

export type UserState = {
    id?: number;
    first_name?: string;
    phone?: string;
    second_name?: string;
    type?: string;
    balance?: number;
    device_id?: string | null;
    organization_id?: number;
    token?: string;
}

const initialState: UserState = {
    id: undefined,
    first_name: undefined,
    phone: undefined,
    second_name: undefined,
    type: undefined,
    balance: undefined,
    device_id: undefined,
    organization_id: undefined,
    token: undefined,
}

const userSlice = createSlice({
    name: `${SLICE_BASE_NAME}/user`,
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            state.id = action.payload?.id
            state.first_name = action.payload?.first_name
            state.phone = action.payload?.phone
            state.second_name = action.payload?.second_name
            state.type = action.payload?.type
            state.balance = action.payload?.balance
            state.device_id = action.payload?.device_id
            state.organization_id = action.payload?.organization_id
            state.token = action.payload?.token
        },
    },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
