import { createStore, Action } from "redux";
import { SideMenuItem, Header } from "./types";

export interface State {
    header: Header,
    menuItems: SideMenuItem[]
}

const defaultState: State = {
    header: {
        userInformation: {
            imageSource: "https://randomuser.me/api/portraits/men/83.jpg"
        },
        companies: [{name: "company A"}, {name: "company B"}, {name: "companyC"}]
    },
    menuItems: [{text: "some item"}]
}

const appReducer = (state: State = defaultState, action: Action): State => {
    switch (action.type) {
        default:
            return Object.assign({}, state);
    }
}

export default createStore(appReducer);