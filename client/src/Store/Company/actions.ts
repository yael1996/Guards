import { ThunkResult, CompanyState, CompanyAction, SET_COMPANIES } from "./types";
import Axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import { UserState } from "../User/types";

export function setCompanies(value: CompanyState): CompanyAction {
    return {
        type: SET_COMPANIES,
        payload: value
    };
}

export function getCompanies(user: UserState): ThunkResult<Promise<CompanyState>> {
    return async (dispatch, getState) => {
        const { _id: id, type } = user;
        const result = await Axios.get(`${config.backendUri}/${type}/${id}`) as AxiosResponse<CompanyState>;
        dispatch(setCompanies(result.data));
        return result.data;
    }
}