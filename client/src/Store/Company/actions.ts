import { ThunkResult, CompanyState, CompanyAction, SET_COMPANIES, CLEAR_COMPANIES, Company } from "./types";
import Axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import { UserState } from "../User/types";

export function clearCompanies(): CompanyAction {
    return {
        type: CLEAR_COMPANIES
    }
}

export function setCompanies(value: CompanyState): CompanyAction {
    return {
        type: SET_COMPANIES,
        payload: value
    };
}

export function getCompanies(user: UserState): ThunkResult<Promise<CompanyState>> {
    return async (dispatch, getState) => {
        const { _id: id, type } = user;
        const result = await Axios.get(`${config.backendUri}/board/${type}/${id}`) as AxiosResponse<CompanyState>;
        dispatch(setCompanies(result.data));
        return result.data;
    }
}

export function createCompany(company: Company, withHolidays: boolean): ThunkResult<Promise<Company>> {
    return async (dispatch, getState) => {
        let url: string = `${config.backendUri}/board`;
        if (withHolidays) {
            url = `${config.backendUri}/board/holidays`;
        }
        const result = await Axios.post(url, company) as AxiosResponse<Company>
        const newState = getState();
        newState.companies.push(result.data);
        dispatch(setCompanies(newState.companies));
        return result.data;
    }
}
