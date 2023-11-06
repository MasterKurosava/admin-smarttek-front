export type UserToken =  {
    id: number;
    abilities: string[];
  }
  
export type User = {
    id: number;
    first_name: string;
    phone: string;
    second_name: string;
    type: string;
    balance: number;
    device_id: string | null;
    organization_id: number;
    tokens: UserToken[];
}

export type LoginCredential = {
    password: string,
    phone: string
}

export type LoginResponseData = {
    data: {
        user: User
        token: string
    };
}


export type SignInCredential = {
    userName: string
    password: string
}

export type SignInResponse = {
    token: string
    user: {
        token: string;
        userName: string
        authority: string[]
        avatar: string
        email: string
    }
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
