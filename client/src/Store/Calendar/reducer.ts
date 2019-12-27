import { CalendarState, CalendarAction, GET_EVENTS, UPDATE_EVENTS, SET_EVENTS, SET } from "./types";

const initialState: CalendarState = {
    boardId: "",
    currentDate: new Date(0, 0, 0),
    events: []
}

export function reducer(state: CalendarState = initialState, action: CalendarAction): CalendarState {
    switch (action.type) {
        case GET_EVENTS:
            return state;
            break;
        case UPDATE_EVENTS:
            return state;
            break;
        case SET_EVENTS:
            const { payload } = action;
            const newState = Object.assign({}, state);
            newState.events = payload;
            console.log("New state is");
            console.log(newState.events);
            return newState;
        case SET:
            return action.payload;
        default:
            return state;
    }
}