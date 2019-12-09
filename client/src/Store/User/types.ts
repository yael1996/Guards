// Need to also add the id to the JSON object, maybe create a wrapper over them?
import { JSONUser, MonthlyConstraints } from "../../../../server/src/mongo/models/user";
import { ThunkAction } from "redux-thunk";

export interface UserState {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    tokens: string[],
    type: string,
    satisfiedConstraints: number,
    monthlyConstraints: MonthlyConstraints
}

export interface UserStateWrapper {
    user: JSONUser
}

export const LOGIN = "LOGIN";
export const GET_USER = "GET_USER";
export const REGISTER_USER = "REGISTER_USER";
export const SET_USER = "SET_USER";

interface LoginAction {
    type: typeof LOGIN,
    payload: {
        
    }
}

interface GetUserAction {
    type: typeof GET_USER
}

interface RegisterUserAction {
    type: typeof REGISTER_USER,
    payload: JSONUser
}

interface SetUserAction {
    type: typeof SET_USER,
    payload: JSONUser
}

export type UserAction = LoginAction | GetUserAction | RegisterUserAction | SetUserAction;
export type ThunkResult<result> = ThunkAction<result, UserStateWrapper, undefined, UserAction>;