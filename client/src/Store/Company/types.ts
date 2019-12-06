
export interface Company {
    id: string,
    title: string
}

export type CompanyState = Company[];

export interface CompanyStateWrapper {
    companies: CompanyState
}

export const GET_COMPANIES = "GET_COMPANIES";

interface GetCompaniesAction {
    type: typeof GET_COMPANIES,
    payload: {
        user: string
    }
}

export type CompanyAction = GetCompaniesAction;