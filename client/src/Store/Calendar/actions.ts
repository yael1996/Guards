import { Event } from "react-big-calendar";
import { CalendarAction, GET_EVENTS,
    UPDATE_EVENTS, NEXT_MONTH, PREVIOUS_MONTH,
    CreationState, CalendarState } from "./types";
import { ThunkAction } from "redux-thunk";

type ThunkResult<result> = ThunkAction<result, CalendarState, undefined, CalendarAction>;

export function createCalendar(creationState: CreationState): ThunkResult<void>  {
    return async (dispatch, getState) => {
        
    }
}

export function getEvents(metaId: string, month: number): CalendarAction {
    return {
        type: GET_EVENTS,
        payload: {
            metaId,
            month
        }
    }
}

export function nextMonth(): CalendarAction {
    return {
        type: NEXT_MONTH,
        payload: {

        }
    }
}

export function previousMonth(): CalendarAction {
    return {
        type: PREVIOUS_MONTH,
        payload: {
            
        }
    }
}

export function updateEvents(metaId: string, month: number, newState: Event[] ): CalendarAction {
    return {
        type: UPDATE_EVENTS,
        payload: {
            metaId,
            month,
            events: newState
        }
    }
}