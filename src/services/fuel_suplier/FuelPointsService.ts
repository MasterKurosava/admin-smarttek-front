import { CreatePointResponse, CreatePointCredential, GetPointResponse, GetPointsResponse, UpdatePointCredential } from '@/@types/organization/fuellingPoint'
import {ApiService, ServerApiService} from '../ApiService'
import {getToken} from '../token'


export async function getPointsApi() {
    return ServerApiService.fetchData<GetPointsResponse>({
        url: '/fuelling-point/',
        method: 'get',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function createFuelPointApi(data:CreatePointCredential) {
    return ServerApiService.fetchData<CreatePointResponse>({
        url: '/fuelling-point/create',
        method: 'post',
        data,
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function updateFuelPointApi(data:UpdatePointCredential) {
    return ServerApiService.fetchData<GetPointResponse>({
        url: '/fuelling-point/update',
        method: 'post',
        headers: {'Authorization': `Bearer ${getToken()}`},
        data
    })
}

export async function deleteFuelPointsApi(data:{id:number}) {
    return ServerApiService.fetchData({
        url: '/fuelling-point/delete',
        method: 'post',
        data,
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}