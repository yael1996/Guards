import { UserState, UserAction, LOGIN } from "./types";

const initialState: UserState = {
    firstname: "test",
    lastname: "test",
    imageUrl: "https://randomuser.me/api/portraits/men/59.jpg"
}

export function reducer(state: UserState = initialState, action: UserAction): UserState {
    switch (action.type) {
        case LOGIN:
            return state;
        default:
            return state;
    }
}