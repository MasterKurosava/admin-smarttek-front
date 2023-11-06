import { lazy } from 'react'
import authRoute from './authRoute'
import type { Routes } from '@/@types/routes'
import { APP_PREFIX_PATH } from '@/constants/route.constant'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'users',
        path: `${APP_PREFIX_PATH}/users`,
        component: lazy(() => import('@/views/orgData/users/Users')),
        authority: [],
    },
    {
        key: 'cars',
        path: `${APP_PREFIX_PATH}/cars`,
        component: lazy(() => import('@/views/orgData/cars/Cars')),
        authority: [],
    },
    {
        key: 'fuelPoints',
        path: `${APP_PREFIX_PATH}/fueling-points`,
        component: lazy(() => import('@/views/orgData/points/Points')),
        authority: [],
    },
    {
        key: 'companies',
        path: `${APP_PREFIX_PATH}/companies`,
        component: lazy(() => import('@/views/admin/company/Companies')),
        authority: [],
    },
]