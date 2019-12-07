
export interface UserState {
    id: string,
    firstname: string,
    lastname: string,
    imageUrl: string
}

export interface UserStateWrapper {
    user: UserState
}

export const LOGIN = "LOGIN";
export const GET_USER = "GET_USER";

interface LoginAction {
    type: typeof LOGIN,
    payload: {
        
    }
}

interface GetUserAction {
    type: typeof GET_USER
}

export type UserAction = LoginAction | GetUserAction;