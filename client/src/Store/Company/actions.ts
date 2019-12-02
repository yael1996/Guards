import { CompanyAction, GET_COMPANIES } from "./types";

export function getCompanies(user: string): CompanyAction {
    return {
        type: GET_COMPANIES,
        payload: {
            user
        }
    }
}