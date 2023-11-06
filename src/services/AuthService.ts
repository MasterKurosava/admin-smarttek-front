import {ApiService, ServerApiService} from './ApiService'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
    LoginCredential,
    LoginResponseData,
} from '@/@types/auth'


export async function loginApi(data: LoginCredential) {
    return ServerApiService.fetchData<LoginResponseData>({
        url: '/auth/login',
        method: 'post',
        data,
    })
}
export async function registerAttemptApi() {
    return ServerApiService.fetchData({
        url: '/auth/register-attempt',
        method: 'post',
        // data,
    })
}

export async function registerCodeAttemptApi() {
    return ServerApiService.fetchData({
        url: '/auth/register-code-confirm/{token}',
        method: 'post',
        // data,
    })
}


// export async function apiSignIn(data: SignInCredential) {
    //     return ApiService.fetchData<SignInResponse>({
    //         url: '/sign-in',
    //         method: 'post',
    //         data,
    //     })
    // }
    
    // export async function apiSignUp(data: SignUpCredential) {
    //     return ApiService.fetchData<SignUpResponse>({
    //         url: '/sign-up',
    //         method: 'post',
    //         data,
    //     })
    // }
    
    export async function apiSignOut() {
        return ApiService.fetchData({
            url: '/sign-out',
            method: 'post',
        })
    }
    
    // export async function apiForgotPassword(data: ForgotPassword) {
    //     return ApiService.fetchData({
    //         url: '/forgot-password',
    //         method: 'post',
    //         data,
    //     })
    // }
    
    // export async function apiResetPassword(data: ResetPassword) {
    //     return ApiService.fetchData({
    //         url: '/reset-password',
    //         method: 'post',
    //         data,
    //     })
    // }