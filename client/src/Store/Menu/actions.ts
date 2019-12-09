import { MenuAction, LOAD_PAGES } from "./types";
import { UserState } from "../User/types";

export function ShowPage(user: UserState): MenuAction {
    return {
        type: LOAD_PAGES,
        payload: {
            user
        }
    }
}