import { createStore, combineReducers, applyMiddleware } from "redux";
import { reducer as calendarReducer } from "./Calendar/reducer";
import { reducer as companiesReducer } from "./Company/reducer";
import { reducer as userReducer } from "./User/reducer";
import { reducer as menuReducer } from "./Menu/reducer";
import thunk, { ThunkMiddleware, ThunkDispatch } from "redux-thunk";
import { CalendarAction, CalendarStateWrapper } from "./Calendar/types";
import { CompanyAction, CompanyStateWrapper } from "./Company/types";
import { MenuAction, MenuStateWrapper } from "./Menu/types";
import { UserAction, UserStateWrapper } from "./User/types";

const rootReducer = combineReducers({
    calendar: calendarReducer,
    companies: companiesReducer,
    user: userReducer,
    menu: menuReducer
});

export type RootState = CalendarStateWrapper & CompanyStateWrapper & MenuStateWrapper & UserStateWrapper;
export type AppAction = CalendarAction | CompanyAction | MenuAction | UserAction;
export type AppDispatch = ThunkDispatch<RootState, undefined, AppAction>;

export default createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<RootState, AppAction>));