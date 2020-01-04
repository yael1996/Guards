import { Event } from "react-big-calendar";
import { CalendarAction, UPDATE_EVENTS, ThunkResult, SET_EVENTS, CalendarState, SET } from "./types";
import { JSONConcreteBoard } from "../../../../server/src/mongo/models/concreteBoard";
import Axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import moment from "moment";
import { Shift } from "../../../../server/src/mongo/models/concreteBoard";
import {UserState} from "../User/types";

function eventsFromShifts(shifts: Shift[]) {
    return shifts.reduce((events, shift) => {
        const { fromTime: start, toTime: end } = shift.shiftTime;
        events.push({
            start: moment(start).add(1, "month").toDate(),
            end: moment(end).add(1, "month").toDate(),
            title: shift.shiftType.toString(),
            resource: shift
        });
        return events;
    }, [] as Event[]);
}

function events(concreteBoard: JSONConcreteBoard) {
    if (!concreteBoard.shifts) {
        return [];
    } else {
        return eventsFromShifts(concreteBoard.shifts);
    }
}

export function set(state: CalendarState): CalendarAction {
    return {
        type: SET,
        payload: state
    };
}

export function getEvents(metaId: string, year: number, month: number, user: UserState): ThunkResult<Promise<Event[]>> {
    return async (dispatch, getState) => {
        let reqUrl = `${config.backendUri}/concreteBoard/${metaId}/${year}/${month}`;
        const result = (await Axios.get(reqUrl)) as AxiosResponse<JSONConcreteBoard>;
        if (result.data && result.data.shifts !== []) {
            dispatch(setEvents(mergeUserConstraintsIntoCalendarEvents(events(result.data),user)));
        } else {
            console.log("Entered else");
            reqUrl = `${config.backendUri}/constraints/emptyBoard`;
            console.log(`Created URL ${reqUrl}`);
            const empty = (await Axios.get(reqUrl, { params: { board: metaId, year, month } })) as AxiosResponse<Shift[]>;
            dispatch(setEvents(mergeUserConstraintsIntoCalendarEvents(eventsFromShifts(empty.data),user)));
        }
        return getState().calendar.events;
    }
}

export function nextMonth(boardId: string, user: UserState): ThunkResult<Promise<Event[]>> {
    return async (dispatch, getState) => {
        const { currentDate } = getState().calendar;
        const newDate = moment(currentDate).add(1, "month").toDate();
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        const events = await dispatch(getEvents(boardId, year, month, user));
        dispatch(setEvents(events));
        return getState().calendar.events;
    }
}

export function previousMonth(boardId: string, user: UserState): ThunkResult<Promise<Event[]>> {
    return async (dispatch, getState) => {
        const { currentDate } = getState().calendar;
        const newDate = moment(currentDate).subtract(1, "month").toDate();
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        const events = await dispatch(getEvents(boardId, year, month, user));
        dispatch(setEvents(events));
        return getState().calendar.events;
    }
}

export function setEvents(events: Event[]): CalendarAction {
    console.log("from set events");
    console.log(events);
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

function mergeUserConstraintsIntoCalendarEvents(calendarEvents: Event[],user: UserState,): Event[] {
    let eventsFromUserConstraints: Event[] = [];
    user.monthlyConstraints.forEach( monthlyConstraint => {
        monthlyConstraint.constraints.forEach( constraint => {
            const { fromTime: start, toTime: end } = constraint.time;
            eventsFromUserConstraints.push(<Event>{
                start: moment(start).add(1, "month").toDate(),
                end: moment(end).add(1, "month").toDate(),
                title: "Constraint",
                resource: constraint,
            })
        })
    });
    let merged = [...calendarEvents,...eventsFromUserConstraints];
    console.log("merged:");
    console.log(merged);
    return merged
}
