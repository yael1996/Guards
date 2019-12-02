import { CompanyState, CompanyAction, GET_COMPANIES } from "./types";

const initialState: CompanyState = [
    { id: "1", title: "1st company" },
    { id: "2", title: "2nd company" },
    { id: "3", title: "3rd company" },
    { id: "4", title: "4th company" },
    { id: "5", title: "5th company" }
];

export function reducer(state: CompanyState = initialState, action: CompanyAction): CompanyState {
    switch (action.type) {
        case GET_COMPANIES:
            return state;
        default:
            return state;
    }
}