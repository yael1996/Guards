import { MenuAction, LOAD_PAGES } from "./types";
import { UserState } from "../User/types";

export function loadPages(user: UserState): MenuAction {
    return {
        type: LOAD_PAGES,
        payload: {
            user
        }
    }
}