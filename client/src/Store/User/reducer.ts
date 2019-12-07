import { UserState, UserAction, LOGIN, GET_USER } from "./types";

const initialState: UserState = {
    id: "123",
    firstname: "test",
    lastname: "test",
    imageUrl: "https://randomuser.me/api/portraits/men/59.jpg"
}

export function reducer(state: UserState = initialState, action: UserAction): UserState {
    switch (action.type) {
        case GET_USER:
            return state;
        case LOGIN:
            return state;
        default:
            return state;
    }
}