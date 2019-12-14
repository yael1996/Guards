import { UserState, UserAction, SET_USER, LOGOUT } from "./types";

const initialState: UserState = {
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    type: "",
    unsatisfiedConstraints: 0,
    monthlyConstraints: [],
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
}

export function reducer(state: UserState = initialState, action: UserAction): UserState {
    switch (action.type) {
        case SET_USER:
            const newState = Object.assign({}, state);
            newState._id = action.payload._id;
            newState.email = action.payload.email;
            newState.firstname = action.payload.firstname;
            newState.lastname = action.payload.lastname;
            newState.monthlyConstraints = action.payload.monthlyConstraints;
            newState.unsatisfiedConstraints = action.payload.unSatisfiedConstraints;
            newState.type = (action.payload.type === 1)? "manager" : "user";
            return newState;
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
}