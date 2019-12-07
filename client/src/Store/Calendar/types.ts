import { Event } from "react-big-calendar";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";

export interface CalendarStateWrapper {
    calendar: CalendarState
}

export interface CalendarState {
    boardId: string,
    currentDate: Date,
    events: Event[]
}

export type DayMap = [boolean, boolean, boolean, boolean, boolean, boolean, boolean];

export interface ShiftSettings {
    length: string,
    amount: string,
    workerCount: string
}

export interface CreationState {
    standardDays: DayMap,
    standardShiftSettings: ShiftSettings,
    specialDays: DayMap,
    specialShiftSettings: ShiftSettings,
    withHolidays: boolean,
    holidayShiftSettings: ShiftSettings
}

export const CREATE = "CREATE";
export const GET_EVENTS = "GET_EVENTS";
export const NEXT_MONTH = "NEXT_MONTH";
export const PREVIOUS_MONTH = "PREVIOUS_MONTH";
export const UPDATE_EVENTS = "UPDATE_EVENTS";

interface CreateAction {
    type: typeof CREATE,
    payload: CreationState
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

export type CalendarAction = CreateAction | GetEventsAction | NextMonthAction | PreviousMonth | UpdateEvents;

export type ThunkResult<result> = ThunkAction<result, CalendarStateWrapper, undefined, CalendarAction>;