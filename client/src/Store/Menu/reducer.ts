import { MenuState, MenuAction, LOAD_PAGES } from "./types";
import { USER_TYPE } from "../User/types";

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
                case USER_TYPE.WORKER:
                    break;
                case USER_TYPE.MANAGER:
                    newState.items.push({
                        text: "Create a board",
                        page: "/dashboard/create"
                    });
                    break;
            }
            return newState;
        default:
            return state;
    }
}