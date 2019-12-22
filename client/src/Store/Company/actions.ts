import { ThunkResult, CompanyState, CompanyAction, SET_COMPANIES, CLEAR_COMPANIES, Company } from "./types";
import Axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import { UserState } from "../User/types";
import Companies from "../../Components/Companies/Companies";

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

export function createCompany(company: Company): ThunkResult<Promise<Company>> {
    return async (dispatch, getState) => {
        let url: string = `${config.backendUri}/board`;
        const result = await Axios.post(url, company) as AxiosResponse<Company>
        const newState = getState();
        newState.companies.push(result.data);
        dispatch(setCompanies(newState.companies));
        return result.data;
    }
}

export function hire(company: Company, user: UserState): ThunkResult<Promise<Company>> {
    return async (dispatch, getState) => {
        const url = `${config.backendUri}/board/${company._id}`
        const result = await Axios.patch(url, {
            workerIds: [...company.workerIds, user._id]
        }) as AxiosResponse<Company>;
        const { companies } = getState();
        const index = companies.findIndex((x) => x._id === result.data._id);
        const newState = [...companies.slice(0, index), result.data, ...companies.slice(index + 1)];
        dispatch(setCompanies(newState));
        return result.data;
    }
}

export function fire(company: Company, user: UserState): ThunkResult<Promise<Company>> {
    return async (dispatch, getState) => {
        const url = `${config.backendUri}/board/${company._id}`
        const indexToRemove = company.workerIds.findIndex((x) => x === user._id);
        const result = await Axios.patch(url, {
            workerIds: [...company.workerIds.slice(0, indexToRemove),
                        ...company.workerIds.slice(indexToRemove + 1)]
        }) as AxiosResponse<Company>;
        const { companies } = getState();
        const index = companies.findIndex((x) => x._id === result.data._id);
        const newState = [...companies.slice(0, index),
                            result.data, 
                            ...companies.slice(index + 1)];
        dispatch(setCompanies(newState));
        return result.data;
    }
}
