import {ServerApiService} from '../ApiService'
import {getToken} from '../token'

export async function getLocationsApi() {
    return ServerApiService.fetchData({
        url: '/locations',
        method: 'get',
        headers: {'Authorization': `Bearer ${getToken()}`}
    })
}