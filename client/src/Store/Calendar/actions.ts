import { Event } from "react-big-calendar";
import { CalendarAction, GET_EVENTS,
    UPDATE_EVENTS, NEXT_MONTH, PREVIOUS_MONTH,
    CreationState, ThunkResult } from "./types";

export function createCalendar(creationState: CreationState): ThunkResult<Promise<void>> {
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