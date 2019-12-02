import { MenuState, MenuAction, SHOW_PAGE } from "./types";

const initialState: MenuState = {
    items: [{
        text: "Test item",
        page: "test"
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