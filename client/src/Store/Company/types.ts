import { ThunkAction } from "redux-thunk";

export interface Company {
    id: string,
    title: string
}

export type CompanyState = Company[];

export interface CompanyStateWrapper {
    companies: CompanyState
}

export const SET_COMPANIES = "SET_COMPANIES";
export const GET_COMPANIES = "GET_COMPANIES";

interface SetCompaniesAction {
    type: typeof SET_COMPANIES,
    payload: CompanyState
}

interface GetCompaniesAction {
    type: typeof GET_COMPANIES,
    payload: {
        userId: string
    }
}

export type CompanyAction = SetCompaniesAction | GetCompaniesAction;
export type ThunkResult<result> = ThunkAction<result, CompanyStateWrapper, undefined, CompanyAction>;