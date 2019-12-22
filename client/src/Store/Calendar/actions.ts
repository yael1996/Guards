import { Event } from "react-big-calendar";
import { CalendarAction, UPDATE_EVENTS, ThunkResult, SET_EVENTS, CalendarState, SET } from "./types";
import { JSONConcreteBoard } from "../../../../server/src/mongo/models/concreteBoard";
import Axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import moment from "moment";

function events(concreteBoard: JSONConcreteBoard) {
    if (!concreteBoard.shifts) {
        return [];
    } else {
        return concreteBoard.shifts.reduce((events, shift) => {
            const { fromTime: start, toTime: end } = shift.shiftTime;
            events.push({
                start,
                end,
                title: shift.shiftType.toString(),
                resource: shift
            });
            return events;
        }, [] as Event[]);
    }
}

export function set(state: CalendarState): CalendarAction {
    return {
        type: SET,
        payload: state
    };
}

export function getEvents(metaId: string, year: number, month: number): ThunkResult<Promise<Event[]>> {
    return async (dispatch, getState) => {
        const reqUrl = `${config.backendUri}/concreteBoard/${metaId}/${year}/${month}`;
        const result = (await Axios.get(reqUrl)) as AxiosResponse<JSONConcreteBoard>;
        dispatch(setEvents(events(result.data)));
        return getState().calendar.events;
    }
}

export function nextMonth(boardId: string): ThunkResult<Promise<Event[]>> {
    return async (dispatch, getState) => {
        const { currentDate } = getState().calendar;
        const newDate = moment(currentDate).add(1, "month").toDate();
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        const events = await dispatch(getEvents(boardId, year, month));
        dispatch(setEvents(events));
        return getState().calendar.events;
    }
}

export function previousMonth(boardId: string): ThunkResult<Promise<Event[]>> {
    return async (dispatch, getState) => {
        const { currentDate } = getState().calendar;
        const newDate = moment(currentDate).subtract(1, "month").toDate();
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        const events = await dispatch(getEvents(boardId, year, month));
        dispatch(setEvents(events));
        return getState().calendar.events;
    }
}

export function setEvents(events: Event[]): CalendarAction {
    return {
        type: SET_EVENTS,
        payload: events
    };
}

export function updateEvents(metaId: string, month: number, newState: Event[]): CalendarAction {
    return {
        type: UPDATE_EVENTS,
        payload: {
            metaId,
            month,
            events: newState
        }
    }
}

export function optimise(boardId: string, year: number, month: number): ThunkResult<Promise<void>> {
    return async (dispatch, getState) => {
        Axios.post(`${config.backendUri}/algorithem`, {
            board: boardId,
            month: {
                year,
                month
            }
        });
    }
}
