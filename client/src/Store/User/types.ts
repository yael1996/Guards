
export interface UserState {
    firstname: string,
    lastname: string,
    imageUrl: string
}

export interface UserStateWrapper {
    user: UserState
}

export const LOGIN = "LOGIN";

interface LoginAction {
    type: typeof LOGIN,
    payload: {
        
    }
}

export type UserAction = LoginAction;