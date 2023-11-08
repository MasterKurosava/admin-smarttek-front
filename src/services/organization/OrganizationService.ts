import { GetOrgUsersResponse } from '@/@types/organization/organization'
import {ApiService, ServerApiService} from '../ApiService'
import {getToken, getUserId} from '../token'


export async function getOrganizationUsersApi() {
    const userId = getUserId();
    return ServerApiService.fetchData<GetOrgUsersResponse>({
        url: '/org-users/'+userId,
        method: 'get',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function addOrganizationApi() {
    return ServerApiService.fetchData({
        url: '/employee/add',
        method: 'post',
        // data
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}

export async function confirmOrganizationApi() {
    return ServerApiService.fetchData({
        url: '/add/confirm/{token}/{code}',
        method: 'post',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}