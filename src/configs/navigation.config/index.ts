import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'
import { APP_PREFIX_PATH } from '@/constants/route.constant'

const navigationConfig: NavigationTree[] = [
    {
        key: 'users',
        path: `${APP_PREFIX_PATH}/users`,
        title: 'Пользователи',
        translateKey: 'nav.users',
        icon: 'crm',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'fuelPoints',
        path: `${APP_PREFIX_PATH}/fueling-points`,
        title: 'Заправки',
        translateKey: 'nav.fuelPoints',
        icon: 'project',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'cars',
        path: `${APP_PREFIX_PATH}/cars`,
        title: 'Автомобили',
        translateKey: 'nav.cars',
        icon: 'cars',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    // {
    //     key: 'companies',
    //     path: `${APP_PREFIX_PATH}/companies`,
    //     title: 'Компании',
    //     translateKey: 'nav.companies',
    //     icon: 'cars',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // }
]

export default navigationConfig
