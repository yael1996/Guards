import { createStore, combineReducers } from "redux";
import { reducer as calendarReducer } from "./Calendar/reducer";
import { reducer as companiesReducer } from "./Company/reducer";
import { reducer as userReducer } from "./User/reducer";
import { reducer as menuReducer } from "./Menu/reducer";

const rootReducer = combineReducers({
    calendar: calendarReducer,
    companies: companiesReducer,
    user: userReducer,
    menu: menuReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default createStore(rootReducer);