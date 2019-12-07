import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState, AppDispatch, AppAction } from "../Store/store";
import HeaderComp from "../Components/Header/Header";
import { Switch, Route } from "react-router-dom";
import Moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SideMenuComp from "../Components/SideMenu/SideMenu";
import { CompanyState } from "../Store/Company/types";
import { UserState } from "../Store/User/types";
import { CalendarState, CreationState } from "../Store/Calendar/types";
import { MenuState } from "../Store/Menu/types";
import BoardCreation from "../Components/BoardCreation/BoardCreation";
import Companies from "../Components/Companies/Companies";
import { createCalendar } from "../Store/Calendar/actions";
import { History } from "history";

interface OwnProps {
    history: History<any>
}

interface ReduxState {
    companies: CompanyState,
    user: UserState,
    calendar: CalendarState,
    menu: MenuState
}

interface ReduxDispatch {
    createCalendar: (creationState: CreationState) => Promise<void>
}

type Props = OwnProps & ReduxState & ReduxDispatch;

class DashBoard extends Component<Props> {
    constructor(props: any) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
    }

    onCreate(creationState: CreationState) {
        this.props.createCalendar(creationState);
    }

    onDateChange(date: Date) {
        
    }

    render() {
        const { companies, user, calendar, createCalendar } = this.props;
        const { items } = this.props.menu;
        const onDateChange = this.onDateChange;
        
        return (
            <div className="App">
                <Switch>
                    <Route path="/dashboard" children={({ history }) => (
                        <HeaderComp companies={companies} amount={3} user={user} history={history} />
                    )} />
                </Switch>
                <section className="container-fluid bg-light ">
                    <section className="row">
                        <section className="col-9 mt-3">
                            <Switch>
                                <Route exact path="/dashboard/companies" children={({ history }) => (
                                    <Companies companies={companies} history={history} />
                                )} />
                                <Route exact path="/dashboard/create" children={({ history }) => (
                                    <BoardCreation history={history} onCreate={createCalendar} />
                                )} />
                                <Route exact path="/dashboard/:boardId/:month">
                                    <Calendar className="min-vh-100"
                                        localizer={momentLocalizer(Moment)}
                                        events={calendar.events}
                                        defaultDate={new Date()}
                                        defaultView="month"
                                        onNavigate={function(newDate: Date) { onDateChange(newDate); }}
                                        views={{
                                            month: true
                                        }} />
                                </Route>
                            </Switch>
                        </section>
                        <section className="col-3 mt-3">
                            <Switch>
                                <Route path="/dashboard" children={({ history, location }) => (
                                    <SideMenuComp menuItems={items} history={history} location={location} />
                                )} />
                            </Switch>
                        </section>
                    </section>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxState => {
    const { companies, user, calendar, menu } = state;
    return {
        companies,
        user,
        calendar,
        menu
    };
}

const mapDispatchToProps = (dispatch: AppDispatch): ReduxDispatch => {
    return {
        createCalendar: (creationState: CreationState) => dispatch(createCalendar(creationState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);