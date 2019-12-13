import { Event } from "react-big-calendar";
import { ThunkAction } from "redux-thunk";

export interface CalendarStateWrapper {
    calendar: CalendarState
}

export interface CalendarState {
    boardId: string,
    currentDate: Date,
    events: Event[]
}

export const CREATE = "CREATE";
export const GET_EVENTS = "GET_EVENTS";
export const NEXT_MONTH = "NEXT_MONTH";
export const PREVIOUS_MONTH = "PREVIOUS_MONTH";
export const SET_EVENTS = "SET_EVENTS";
export const UPDATE_EVENTS = "UPDATE_EVENTS";

interface GetEventsAction {
    type: typeof GET_EVENTS,
    payload: {
        metaId: string,
        month: number
    }
}

interface NextMonthAction {
    type: typeof NEXT_MONTH,
    payload: {

    }
}

interface PreviousMonth {
    type: typeof PREVIOUS_MONTH,
    payload: {

    }
}

interface SetEvents {
    type: typeof SET_EVENTS,
    payload: Event[]
}

interface UpdateEvents {
    type: typeof UPDATE_EVENTS,
    payload: {
        metaId: string,
        month: number,
        events: Event[]
    }
}

export type CalendarAction = GetEventsAction | NextMonthAction | PreviousMonth | SetEvents | UpdateEvents;

export type ThunkResult<result> = ThunkAction<result, CalendarStateWrapper, undefined, CalendarAction>;