import { AddCarCredential, CarResponse, CarsResponse } from '@/@types/organization/car'
import {ApiService, ServerApiService} from '../ApiService'
import {getToken} from '../token'

export async function getCarsApi() {
    return ServerApiService.fetchData<CarsResponse>({
        url: '/organization/cars/',
        method: 'get',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function addCarApi(data: AddCarCredential) {
    return ServerApiService.fetchData<any>({
        url: '/organization/cars/add',
        method: 'post',
        data,
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function attachCarApi(c_id: number, u_id:number) {
    return ServerApiService.fetchData({
        url: `/organization/cars/${c_id}/attach/${u_id}`,
        method: 'patch',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function deleteCarApi(id:number) {
    return ServerApiService.fetchData({
        url: '/organization/cars/'+id,
        method: 'delete',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}