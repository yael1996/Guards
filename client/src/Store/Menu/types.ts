import { UserState } from "../User/types";

export interface MenuItem {
    text: string,
    page: string
}

export interface MenuState {
    items: MenuItem[]
}

export interface MenuStateWrapper {
    menu: MenuState
}

export const LOAD_PAGES = "LOAD_PAGES";

interface LoadPagesAction {
    type: typeof LOAD_PAGES,
    payload: {
        user: UserState
    }
}

export type MenuAction = LoadPagesAction;