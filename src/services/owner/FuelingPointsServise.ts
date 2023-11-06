import { AddPointsCredential, GetPointResponse, GetPointsResponse } from '@/@types/organization/fuellingPoint'
import {ApiService, ServerApiService} from '../ApiService'
import {getToken} from '../token'


export async function getPointsApi() {
    return ServerApiService.fetchData<GetPointsResponse>({
        url: '/fuelling-point',
        method: 'get',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function getPointApi(id:number) {
    return ServerApiService.fetchData<GetPointResponse>({
        url: '/fuelling-point/id',
        method: 'get',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function addPointApi(data:AddPointsCredential) {
    return ServerApiService.fetchData<GetPointResponse>({
        url: '/fuelling-point/add',
        method: 'post',
        headers: {'Authorization': `Bearer ${getToken()}`},
        data
    })
}

export async function deletePointsApi(id:number) {
    return ServerApiService.fetchData({
        url: '/fuelling-point/'+id,
        method: 'delete',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}