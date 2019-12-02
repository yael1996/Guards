import { MenuAction, SHOW_PAGE } from "./types";

export function ShowPage(page: string): MenuAction {
    return {
        type: SHOW_PAGE,
        payload: {
            page
        }
    }
}