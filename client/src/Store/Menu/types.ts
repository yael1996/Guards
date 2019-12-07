
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

export const SHOW_PAGE = "SHOW_PAGE";

interface ShowPageAction {
    type: typeof SHOW_PAGE,
    payload: {
        page: string
    }
}

export type MenuAction = ShowPageAction;