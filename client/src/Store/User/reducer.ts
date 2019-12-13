import { UserState, UserAction, SET_USER, LOGOUT } from "./types";

const initialState: UserState = {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    tokens: [],
    type: "",
    satisfiedConstraints: 0,
    monthlyConstraints: {
        month: {
            month: 0,
            year: 0
        },
        constraints: []
    },
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
}

export function reducer(state: UserState = initialState, action: UserAction): UserState {
    switch (action.type) {
        case SET_USER:
            const newState = Object.assign({}, state, action.payload);
            return newState;
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}