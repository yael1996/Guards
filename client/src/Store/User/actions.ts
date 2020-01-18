import { UserAction, SET_USER, UserState, LOGOUT, USER_TYPE } from "./types";
import {JSONUser, MonthlyConstraints} from "../../../../server/src/mongo/models/user";
import { ThunkResult } from "./types";
import Axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import { Shift } from "../../../../server/src/mongo/models/concreteBoard";

export function registerUser(user: UserState, type: USER_TYPE): ThunkResult<Promise<UserState>> {
    return async (dispatch, getState) => {
        const userType = (type === "user")? 1: 2;
        const payload: UserState = Object.assign({}, user, { type: userType });
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
        const state = getState();
        return result.data.filter((user) => user._id !== state.user._id);
    }
}

export function addConstraint(year: number, month: number, text: string, shift: Shift): ThunkResult<Promise<void>> {
    return async (dispatch, getState) => {
        const { user } = getState();
        const { fromTime, toTime } = shift.shiftTime;
        
        const modified = Object.assign({}, user, {
            monthlyConstraints: [
                ...user.monthlyConstraints,
                {
                    month: { month, year },
                    constraints: [
                        { time: { fromTime, toTime }, text }
                    ]
                }
            ]
        });
        const response = await Axios.patch(`${config.backendUri}/user`, modified) as AxiosResponse<JSONUser>;
        dispatch(setUserSync(response.data));
    }
}