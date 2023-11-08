import {ApiService, ServerApiService} from '../ApiService'

export async function getColumnsApi() {
    return ServerApiService.fetchData({
        url: '/column/fuelling-point/{fuellingPoint}',
        method: 'get',
    })
}

export async function getColumnApi() {
    return ServerApiService.fetchData({
        url: '/column/id',
        method: 'get',
    })
}

export async function updateColumnApi() {
    return ServerApiService.fetchData({
        url: '/column/id',
        method: 'patch',
    })
}


export async function addColumnApi() {
    return ServerApiService.fetchData({
        url: '/column/{fuellingPoint}/add',
        method: 'post',
        // data
    })
}

export async function deleteColumnApi() {
    return ServerApiService.fetchData({
        url: '/column/id',
        method: 'delete',
    })
}