import { CompanyState, CompanyAction, SET_COMPANIES, CLEAR_COMPANIES } from "./types";

const initialState: CompanyState = [];

export function reducer(state: CompanyState = initialState, action: CompanyAction): CompanyState {
    switch (action.type) {
        case SET_COMPANIES:
            return action.payload;
        case CLEAR_COMPANIES:
            return initialState;
        default:
            return state;
    }
}