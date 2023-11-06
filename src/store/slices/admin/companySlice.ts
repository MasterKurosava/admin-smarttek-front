import { AddCompanyCredential, Company } from '@/@types/admin/company';
import { addComplanyApi, attachOwnerCompanyApi, deleteCompanyApi, getCompaniesApi } from '@/services/admin/CompanyService';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { object } from 'yup';

type AttachOwnerPayload = {
    c_id: number;
    u_id: number;
};

export type CompanyState = Company[]

const initialState: CompanyState = []

const SLICE_NAME = 'adminCompanies';


export const fetchCompanies = createAsyncThunk(
    SLICE_NAME + '/fetch',
    async () => {
        const response = await getCompaniesApi()
        return response.data
})

export const addCompany = createAsyncThunk(
    SLICE_NAME + '/add',
    async (data: AddCompanyCredential) => {
        const response = await addComplanyApi(data)
        return response.data
})

export const deleteCompany = createAsyncThunk(
    SLICE_NAME + '/delete',
    async (id: number) => {
        await deleteCompanyApi(id)
        return id
})


export const attachOwnerCompany = createAsyncThunk(
    SLICE_NAME + '/attach',
    async ({c_id, u_id}: AttachOwnerPayload) => {
        const response = await attachOwnerCompanyApi(c_id, {user_id:u_id});
    }
);


const CompanySlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCompanies.fulfilled, (state, action) => {
            return action.payload.data.companies
          })
          .addCase(addCompany.fulfilled, (state, action) => {
            const newCompany = action.payload.data;
            return [...state, newCompany];
          })
          .addCase(deleteCompany.fulfilled, (state, action) => {
            return state.filter((company) => company.id !== action.payload);
          });
    },
})

export default CompanySlice.reducer