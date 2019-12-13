import { CalendarState, CalendarAction, GET_EVENTS, UPDATE_EVENTS, SET_EVENTS } from "./types";

const initialState: CalendarState = {
    boardId: "1",
    currentDate: new Date(),
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
            return newState;
        default:
            return state;
    }
}