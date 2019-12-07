import { Event } from "react-big-calendar";
import { CalendarAction,
    UPDATE_EVENTS, NEXT_MONTH, PREVIOUS_MONTH,
    CreationState, ThunkResult } from "./types";
import { JSONBoard } from "../../../../server/src/mongo/models/Board";
import axios, { AxiosResponse } from "axios";

export function createCalendar(creationState: CreationState): ThunkResult<Promise<JSONBoard>> {
    return async (dispatch, getState) => {
        return (await axios.post("")).data;
    }
}

export function getEvents(metaId: string, year: number, month: number): ThunkResult<Promise<JSONBoard>> {
    return async (dispatch, getState) => {
        const result = await axios.get("");
        return result.data;
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