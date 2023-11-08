import { combineReducers, CombinedState, AnyAction, Reducer } from 'redux'
import auth, { AuthState } from './slices/auth'
import base, { BaseState } from './slices/base'
import locale, { LocaleState } from './slices/locale/localeSlice'
import theme, { ThemeState } from './slices/theme/themeSlice'
import RtkQueryService from '@/services/RtkQueryService'
import { CarsState, PointsState,UsersState } from './slices/org'
import orgUsers from './slices/org/usersSlice'
import orgCars from './slices/org/carsSlice'
import adminCompanies from './slices/admin/companySlice'
import allAdminUsers from './slices/admin/allUsersSlice'
import orgPoints from './slices/org/pointsSlice'
import orgLocations, { LocationsState } from './slices/org/locationsSlice'
import { CompanyState, AllUsersState } from './slices/admin'
import {FuelPointsState} from './slices/fuel_suplier'
import fuelPoints from './slices/fuel_suplier/fuelPointsSlice'



export type RootState = CombinedState<{
    auth: CombinedState<AuthState>
    base: CombinedState<BaseState>
    locale: LocaleState
    theme: ThemeState
    orgUsers: UsersState
    orgCars: CarsState
    orgPoints: PointsState
    orgLocations: LocationsState
    adminCompanies: CompanyState
    allAdminUsers: AllUsersState
    fuelPoints: FuelPointsState
    // organization: OrgState
    /* eslint-disable @typescript-eslint/no-explicit-any */
    [RtkQueryService.reducerPath]: any
}>

export interface AsyncReducers {
    [key: string]: Reducer<any, AnyAction>
}

const staticReducers = {
    auth,
    base,
    locale,
    theme,
    orgUsers,
    orgCars,
    orgPoints,
    orgLocations,
    adminCompanies,
    allAdminUsers,
    fuelPoints,
    // organization,
    [RtkQueryService.reducerPath]: RtkQueryService.reducer,
}

const rootReducer =
    (asyncReducers?: AsyncReducers) =>
    (state: RootState, action: AnyAction) => {
        const combinedReducer = combineReducers({
            ...staticReducers,
            ...asyncReducers,
        })
        return combinedReducer(state, action)
    }

export default rootReducer
