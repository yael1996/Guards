// Need to also add the id to the JSON object, maybe create a wrapper over them?
import { JSONUser, MonthlyConstraints } from "../../../../server/src/mongo/models/user";
import { ThunkAction } from "redux-thunk";

export type USER_TYPE = "manager" | "user" | "";

export interface UserState {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    tokens: string[],
    type: USER_TYPE,
    satisfiedConstraints: number,
    monthlyConstraints: MonthlyConstraints,
    imageUrl: string
}

export interface UserStateWrapper {
    user: UserState
}

export const LOGOUT = "LOGOUT";
export const GET_USER = "GET_USER";
export const REGISTER_USER = "REGISTER_USER";
export const SET_USER = "SET_USER";

interface SetUserAction {
    type: typeof SET_USER,
    payload: JSONUser
}

interface LogoutAction {
    type: typeof LOGOUT
}

export type UserAction = SetUserAction | LogoutAction;
export type ThunkResult<result> = ThunkAction<result, UserStateWrapper, undefined, UserAction>;