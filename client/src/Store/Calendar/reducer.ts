import { CalendarState, CalendarAction, GET_EVENTS, UPDATE_EVENTS } from "./types";

const initialState: CalendarState = {
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
        default:
            return state;
    }
}