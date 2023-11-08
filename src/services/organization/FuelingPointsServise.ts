import { GetPointResponse, GetPointsResponse } from '@/@types/organization/fuellingPoint'
import {ApiService, ServerApiService} from '../ApiService'
import {getToken} from '../token'


export async function getPointsApi() {
    return ServerApiService.fetchData<GetPointsResponse>({
        url: '/public/fuelling-point',
        method: 'get',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function getPointApi(id:number) {
    return ServerApiService.fetchData<GetPointResponse>({
        url: '/public/fuelling-point/id',
        method: 'get',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}