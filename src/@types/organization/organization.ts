import {User} from '../auth';

export type GetOrgUsersResponse = {
    data: User[]
}

export type AddOrgCredential = {
    userName: string
}

export type ConfirmOrgCredential = {
    userName: string
}