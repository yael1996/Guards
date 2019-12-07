import { Event } from "react-big-calendar";
import { CalendarAction,
    UPDATE_EVENTS, NEXT_MONTH, PREVIOUS_MONTH,
    CreationState, ThunkResult, DayMap, SET_EVENTS } from "./types";
import { JSONBoard } from "../../../../server/src/mongo/models/Board";
import { JSONConcreteBoard } from "../../../../server/src/mongo/models/concreteBoard";
import axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import { UserState } from "../User/types";
import moment from "moment";

function events(concreteBoard: JSONConcreteBoard) {
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

export function createCalendar(creationState: CreationState, user: UserState): ThunkResult<Promise<JSONBoard>> {
    const toDaysArray = (days: DayMap): number[] => {
        return days.reduce((base, val, index) => {
            if (val) {
                base.push(index);
            }
            return base;
        }, [] as number[]);
    }

    return async (dispatch, getState) => {
        const { id } = user;
        const { standardDays, specialDays } = creationState;
        const {
            amount: stdAmount, length: stdLength, workerCount: stdWorkerCount
        } = creationState.standardShiftSettings;
        const {
            amount: spcAmount,
            length: spcLength,
            workerCount: spcWorkerCount
        } = creationState.specialShiftSettings;
        const {
            amount: hdAmount,
            length: hdLength,
            workerCount: hdWorkerCount
        } = creationState.holidayShiftSettings;

        let payload: JSONBoard = {
            ownerId: id,
            description: "",
            name: "",
            workerIds: [],
            boardSettings: {
                regularDaySettings: {
                    days: toDaysArray(standardDays),
                    daySettings: {
                        numShiftsInDay: parseInt(stdAmount),
                        startHour: {
                            hour: 1,
                            minute: 1
                        }
                    },
                    shiftSettings: {
                        numWorkersInShift: parseInt(stdWorkerCount),
                        shiftLengthInHours: parseInt(stdLength)
                    }
                },
                specialDaysSettings: {
                    days: toDaysArray(specialDays),
                    daySettings: {
                        numShiftsInDay: parseInt(spcAmount),
                        startHour: {
                            hour: 1,
                            minute: 1
                        }
                    },
                    shiftSettings: {
                        numWorkersInShift: parseInt(spcWorkerCount),
                        shiftLengthInHours: parseInt(spcLength)
                    }
                },
                specialDatesSettings: {
                    dates: [], // Should be optional? just in case
                    daySettings: {
                        numShiftsInDay: parseInt(hdAmount),
                        startHour: {
                            hour: 1,
                            minute: 1
                        }
                    },
                    shiftSettings: {
                        numWorkersInShift: parseInt(hdWorkerCount),
                        shiftLengthInHours: parseInt(hdLength)
                    }
                }
            }
        };

        const result = (await axios.post(`${config.backendUri}/board`, payload)) as AxiosResponse<JSONBoard>;
        return result.data; // Should check status before to continue the chain with then or catch
    }
}

export function getEvents(metaId: string, year: number, month: number): ThunkResult<Promise<Event[]>> {
    return async (dispatch, getState) => {
        const reqUrl = `${config.backendUri}/concreteBoard/${metaId}/${year}/${month}`;
        const result = (await axios.get(reqUrl)) as AxiosResponse<JSONConcreteBoard>;
        dispatch(setEvents(events(result.data)));
        return getState().calendar.events;
    }
}

export function nextMonth(): ThunkResult<Promise<Event[]>> {
    return async (dispatch, getState) => {
        const { boardId, currentDate } = getState().calendar;
        const newDate = moment(currentDate).add(1, "month").toDate();
        const year = newDate.getFullYear();
        const month = newDate.getMonth();
        const events = await dispatch(getEvents(boardId, year, month));
        dispatch(setEvents(events));
        return getState().calendar.events;
    }
}

// export function previousMonth(): ThunkResult<Promise<JSONConcreteBoard>> {
//     return async (dispatch, getState) {
//         const { calendar } = getState();
//         return {}
//     }
// }

export function setEvents(events: Event[]): CalendarAction {
    return {
        type: SET_EVENTS,
        payload: events
    };
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