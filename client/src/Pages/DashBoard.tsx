import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../Store/store";
import { Dispatch } from "redux";
import HeaderComp from "../Components/Header/Header";
import { Switch, Route } from "react-router-dom";
import Moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SideMenuComp from "../Components/SideMenu/SideMenu";
import { CompanyState } from "../Store/Company/types";
import { UserState } from "../Store/User/types";
import { CalendarState, CreationState, CalendarAction } from "../Store/Calendar/types";
import { MenuState } from "../Store/Menu/types";
import BoardCreation from "../Components/BoardCreation/BoardCreation";
import Companies from "../Components/Companies/Companies";
import { createCalendar } from "../Store/Calendar/actions";

interface ReduxState {
    companies: CompanyState,
    user: UserState,
    calendar: CalendarState,
    menu: MenuState
}

interface ReduxDispatch {
    // createCalendar: (creationState: CreationState) => void
}

type Props = ReduxState & ReduxDispatch;

class DashBoard extends Component<Props> {
    constructor(props: any) {
        super(props);
    }

    render() {
        const { companies, user, calendar } = this.props;
        const { items } = this.props.menu;
        
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
                                    <BoardCreation history={history} onCreate={() => {}} />
                                )} />
                                <Route exact path="/dashboard/:boardId/:month">
                                    <Calendar className="min-vh-100"
                                        localizer={momentLocalizer(Moment)}
                                        events={calendar.events}
                                        defaultDate={new Date()}
                                        defaultView="month" />
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

const mapDispatchToProps = (dispatch: Dispatch): ReduxDispatch => {
    return {
        // createCalendar: (creationState: CreationState) => dispatch(createCalendar(creationState))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);