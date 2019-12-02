import { UserAction, LOGIN } from "./types";

export function Login(): UserAction {
    return {
        type: LOGIN,
        payload: {
            
        }
    }
}