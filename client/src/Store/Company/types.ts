import { ThunkAction } from "redux-thunk";
import { BoardSettings } from "../../../../server/src/mongo/models/Board";

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

export interface Company {
    id: string,
    name: string,
    description: string,
    ownerId: string,
    boardSettings: BoardSettings,
    workerIds: string[]
}

export type CompanyState = Company[];

export interface CompanyStateWrapper {
    companies: CompanyState
}

export const CLEAR_COMPANIES = "CLEAR_COMPANIES";
export const SET_COMPANIES = "SET_COMPANIES";
export const GET_COMPANIES = "GET_COMPANIES";

interface ClearCompaniesAction {
    type: typeof CLEAR_COMPANIES
}

interface SetCompaniesAction {
    type: typeof SET_COMPANIES,
    payload: CompanyState
}

interface GetCompaniesAction {
    type: typeof GET_COMPANIES,
    payload: {
        userId: string
    }
}

export type CompanyAction = ClearCompaniesAction | SetCompaniesAction | GetCompaniesAction;
export type ThunkResult<result> = ThunkAction<result, CompanyStateWrapper, undefined, CompanyAction>;