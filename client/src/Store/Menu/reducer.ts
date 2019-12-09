import { MenuState, MenuAction, LOAD_PAGES } from "./types";

const initialState: MenuState = {
    items: []
}

export function reducer(state: MenuState = initialState, action: MenuAction): MenuState {
    switch (action.type) {
        case LOAD_PAGES:
            const { type } = action.payload.user;
            const newState = Object.assign({}, state);
            newState.items = [
                {
                    text: "Companies",
                    page: "dashboard/companies"
                }
            ]
            switch (type) {
                case "user":
                    break;
                case "manager":
                    break;
            }
            return newState;
        default:
            return state;
    }
}