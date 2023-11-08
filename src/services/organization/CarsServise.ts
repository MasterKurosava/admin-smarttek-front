import { AddCarCredential, CarResponse, CarsResponse } from '@/@types/organization/car'
import {ApiService, ServerApiService} from '../ApiService'
import {getToken} from '../token'

export async function getCarsApi() {
    return ServerApiService.fetchData<CarsResponse>({
        url: '/car-manage/list',
        method: 'get',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function addCarApi(data: AddCarCredential) {
    return ServerApiService.fetchData<any>({
        url: '/car-manage/create',
        method: 'post',
        data,
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function attachCarApi(c_id: number, data:any) {
    return ServerApiService.fetchData({
        url: `/car-manage/${c_id}/attach`,
        method: 'post',
        data,
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function deleteCarApi(id:number) {
    return ServerApiService.fetchData({
        url: '/car-manage/delete/'+id,
        method: 'post',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}


export async function getUserCars(user_id:number) {
    return ServerApiService.fetchData({
        url: `/car-manage/list/user/${user_id}`,
        method: 'get',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}
