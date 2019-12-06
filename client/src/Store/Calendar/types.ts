import { Event } from "react-big-calendar";

export interface CalendarState {
    currentDate: Date,
    events: Event[]
}

export const CREATE = "CREATE";
export const GET_EVENTS = "GET_EVENTS";
export const NEXT_MONTH = "NEXT_MONTH";
export const PREVIOUS_MONTH = "PREVIOUS_MONTH";
export const UPDATE_EVENTS = "UPDATE_EVENTS";

interface CreateAction {
    type: typeof CREATE,
    payload: {
        
    }
}

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

interface UpdateEvents {
    type: typeof UPDATE_EVENTS,
    payload: {
        metaId: string,
        month: number,
        events: Event[]
    }
}

export type CalendarAction = GetEventsAction | NextMonthAction | PreviousMonth | UpdateEvents;