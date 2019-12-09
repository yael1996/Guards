import { UserState, UserAction, LOGIN, GET_USER, SET_USER } from "./types";

const initialState: UserState = {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    tokens: [],
    type: "",
    satisfiedConstraints: 0,
    monthlyConstraints: {
        month: 0,
        constraints: []
    }
}

export function reducer(state: UserState = initialState, action: UserAction): UserState {
    switch (action.type) {
        case GET_USER:
            return state;
        case LOGIN:
            return state;
        case SET_USER:
            const newState = Object.assign({}, state, action.payload);
            return newState;
        default:
            return state;
    }
}