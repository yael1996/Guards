import { ThunkResult, CompanyState, CompanyAction, SET_COMPANIES, CLEAR_COMPANIES, Company } from "./types";
import Axios, { AxiosResponse } from "axios";
import config from "../../config/config";
import { UserState } from "../User/types";

export function clearCompanies(): CompanyAction {
    return {
        type: CLEAR_COMPANIES
    }
}

export function setCompanies(value: CompanyState): CompanyAction {
    return {
        type: SET_COMPANIES,
        payload: value
    };
}

export function getCompanies(user: UserState): ThunkResult<Promise<CompanyState>> {
    return async (dispatch, getState) => {
        const { _id: id, type } = user;
        const result = await Axios.get(`${config.backendUri}/board/${type}/${id}`) as AxiosResponse<CompanyState>;
        dispatch(setCompanies(result.data));
        return result.data;
    }
}

export function createCompany(company: CompanyState): ThunkResult<Promise<CompanyState>> {
    return async (dispatch, getState) => {
        const result = await Axios.post(`${config.backendUri}/board`, company) as AxiosResponse<CompanyState>
        return result.data;
    }
}
// export function createCalendar(creationState: CreationState, user: UserState): ThunkResult<Promise<JSONBoard>> {
//     const toDaysArray = (days: DayMap): number[] => {
//         return days.reduce((base, val, index) => {
//             if (val) {
//                 base.push(index);
//             }
//             return base;
//         }, [] as number[]);
//     }

//     return async (dispatch, getState) => {
//         const { _id } = user;
//         const { standardDays, specialDays } = creationState;
//         const {
//             amount: stdAmount, length: stdLength, workerCount: stdWorkerCount
//         } = creationState.standardShiftSettings;
//         const {
//             amount: spcAmount,
//             length: spcLength,
//             workerCount: spcWorkerCount
//         } = creationState.specialShiftSettings;
//         const {
//             amount: hdAmount,
//             length: hdLength,
//             workerCount: hdWorkerCount
//         } = creationState.holidayShiftSettings;

//         let payload: JSONBoard = {
//             ownerId: _id,
//             description: "",
//             name: "",
//             workerIds: [],
//             boardSettings: {
//                 regularDaySettings: {
//                     days: toDaysArray(standardDays),
//                     daySettings: {
//                         numShiftsInDay: parseInt(stdAmount),
//                         startHour: {
//                             hour: 1,
//                             minute: 1
//                         }
//                     },
//                     shiftSettings: {
//                         numWorkersInShift: parseInt(stdWorkerCount),
//                         shiftLengthInHours: parseInt(stdLength)
//                     }
//                 },
//                 specialDaysSettings: {
//                     days: toDaysArray(specialDays),
//                     daySettings: {
//                         numShiftsInDay: parseInt(spcAmount),
//                         startHour: {
//                             hour: 1,
//                             minute: 1
//                         }
//                     },
//                     shiftSettings: {
//                         numWorkersInShift: parseInt(spcWorkerCount),
//                         shiftLengthInHours: parseInt(spcLength)
//                     }
//                 },
//                 specialDatesSettings: {
//                     dates: [], // Should be optional? just in case
//                     daySettings: {
//                         numShiftsInDay: parseInt(hdAmount),
//                         startHour: {
//                             hour: 1,
//                             minute: 1
//                         }
//                     },
//                     shiftSettings: {
//                         numWorkersInShift: parseInt(hdWorkerCount),
//                         shiftLengthInHours: parseInt(hdLength)
//                     }
//                 }
//             }
//         };

//         const result = (await axios.post(`${config.backendUri}/board`, payload)) as AxiosResponse<JSONBoard>;
//         return result.data;
//     }
// }