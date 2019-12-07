import { UserAction, LOGIN, GET_USER } from "./types";

export function getUser(): UserAction {
    return {
        type: GET_USER
    }
}
export function Login(): UserAction {
    return {
        type: LOGIN,
        payload: {
            
        }
    }
}