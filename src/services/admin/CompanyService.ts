import { AddCarCredential, CarResponse, CarsResponse } from '@/@types/organization/car'
import {ApiService, ServerApiService} from '../ApiService'
import {getToken} from '../token'
import { AddCompanyCredential, IndexCompaniesResponse } from '@/@types/admin/company'

export async function getCompaniesApi() {
    return ServerApiService.fetchData<IndexCompaniesResponse>({
        url: '/admin/company',
        method: 'get',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function addComplanyApi(data: AddCompanyCredential) {
    return ServerApiService.fetchData<any>({
        url: '/admin/company/create',
        method: 'post',
        data,
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function deleteCompanyApi(company_id: number) {
    return ServerApiService.fetchData({
        url: `/admin/company/${company_id}/delete`,
        method: 'post',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function getOwnerCompanyApi(company_id: number) {
    return ServerApiService.fetchData({
        url: `/admin/company/${company_id}/owner`,
        method: 'get',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
    }

export async function attachOwnerCompanyApi(company_id: number, data:any) {
    return ServerApiService.fetchData({
        url: `/admin/company/${company_id}/attach-owner`,
        method: 'post',
        data,
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function getAllUsersApi() {
    return ServerApiService.fetchData({
        url: `/admin/company/users`,
        method: 'get',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}