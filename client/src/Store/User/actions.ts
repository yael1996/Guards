import { UserAction, LOGIN, GET_USER, SET_USER, UserState, REGISTER_USER } from "./types";
import { JSONUser } from "../../../../server/src/mongo/models/user";
import { ThunkResult } from "./types";
import axios, { AxiosResponse } from "axios";
import config from "../../config/config";

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

export function registerUser(user: UserState, type: string): ThunkResult<Promise<UserState>> {
    return async (dispatch, getState) => {
        const { firstname, lastname } = getState().user;
        const payload: JSONUser = {
            boardId: "",
            email: "",
            firstname,
            lastname,
            monthlyConstraints: {
                month: 1,
                constraints: []
            },
            tokens: [""],
            type,
            satisfiedConstraints: 1
        };
        const result = (await axios.post(`${config.backendUri}/user`, payload)) as AxiosResponse<JSONUser>;
        dispatch(setUser(result.data));
        return getState().user;
    }
}

export function setUserSync(user: JSONUser): UserAction {
    return {
        type: SET_USER,
        payload: user
    }
}

export function setUser(user: JSONUser): ThunkResult<Promise<void>> {
    return async (dispatch, getState) => {
        dispatch(setUserSync(user));
    }
}