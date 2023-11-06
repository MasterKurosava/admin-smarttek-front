import { APP_PREFIX_PATH } from "@/constants/route.constant"

export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

export const appConfig: AppConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: `${APP_PREFIX_PATH}/users`,
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}
export const serverAppConfig = {
    // serverPrefix: 'https://server.cabinet.smart-tek.kz/api',
    serverPrefix: 'http://127.0.0.1:8000/api',
    apiPrefix: '/api',
    authenticatedEntryPath: `${APP_PREFIX_PATH}/users`,
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: false,
}