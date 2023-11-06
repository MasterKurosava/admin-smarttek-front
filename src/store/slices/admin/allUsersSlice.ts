import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData } from '@/@types/organization/user';
import { getAllUsersApi } from '@/services/admin/CompanyService';

export type AllUsersState = UserData[];
const initialState: AllUsersState = [];

const SLICE_NAME = 'allAdminUsers';

export const fetchAllUsers = createAsyncThunk<UserData[], void, { rejectValue: string }>(
  `${SLICE_NAME}/fetch`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllUsersApi();
      if (response && Array.isArray(response.data)) {
        return response.data as UserData[];
      } else {
        return rejectWithValue('Invalid response data');
      }
    } catch (error) {
      return rejectWithValue('Error fetching users');
    }
  }
);

const AllUsersSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<UserData[]>) => {
        
        return action.payload;
      });
  },
});

export default AllUsersSlice.reducer;
