import {User} from '../auth';

export type GetOrgUsersResponse = User[]

export type AddOrgCredential = {
    userName: string
}

export type ConfirmOrgCredential = {
    userName: string
}