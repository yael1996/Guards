import { UserAction, SET_USER, UserState, LOGOUT } from "./types";
import { JSONUser } from "../../../../server/src/mongo/models/user";
import { ThunkResult } from "./types";
import Axios, { AxiosResponse } from "axios";
import config from "../../config/config";

export function registerUser(user: UserState, type: string): ThunkResult<Promise<UserState>> {
    return async (dispatch, getState) => {
        const payload: UserState = Object.assign({}, user, { type });
        const result = (await Axios.post(`${config.backendUri}/user`, payload)) as AxiosResponse<JSONUser>;
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

export function logout(): UserAction {
    return {
        type: LOGOUT
    }
}

export function getHirePotential(): ThunkResult<Promise<UserState[]>> {
    return async (dispatch, getState) => {
        const result = (await Axios.get(`${config.backendUri}/user`)) as AxiosResponse<UserState[]>;
        return result.data;
    }
}