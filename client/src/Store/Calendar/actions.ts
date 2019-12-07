import { Event } from "react-big-calendar";
import { CalendarAction,
    UPDATE_EVENTS, NEXT_MONTH, PREVIOUS_MONTH,
    CreationState, ThunkResult, DayMap } from "./types";
import { JSONBoard, ShiftSettings } from "../../../../server/src/mongo/models/Board";
import axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import { getUser } from "../User/actions";
import { UserState } from "../User/types";

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

export function getEvents(metaId: string, year: number, month: number): ThunkResult<Promise<JSONBoard>> {
    return async (dispatch, getState) => {
        const result = (await axios.get(`${config.backendUri}/board`)) as AxiosResponse<JSONBoard>;
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