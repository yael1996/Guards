import { MenuState, MenuAction, SHOW_PAGE } from "./types";

const initialState: MenuState = {
    items: [{
        text: "Companies",
        page: "/dashboard/companies"
    }]
}

export function reducer(state: MenuState = initialState, action: MenuAction): MenuState {
    switch (action.type) {
        case SHOW_PAGE:
            return state;
        default:
            return state;
    }
}