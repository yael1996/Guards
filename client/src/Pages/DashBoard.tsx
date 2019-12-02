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
import { CalendarState } from "../Store/Calendar/types";
import { MenuState } from "../Store/Menu/types";

interface ReduxState {
    companies: CompanyState,
    user: UserState,
    calendar: CalendarState,
    menu: MenuState
}

interface ReduxDispatch {

}

type Props = ReduxState & ReduxDispatch;

class DashBoard extends Component<Props> {
    render() {
        const { companies, user, calendar } = this.props;
        const { items } = this.props.menu;
        
        return (
            <div className="App" style={{height : '100%', width : '100%'}}>
                <HeaderComp companies={companies} user={user} />
                <section className="content-area">
                    <section className="main-area">
                        <Switch>
                            <section style={{ height: "100vh" }}>
                                <Route path="/dashboard">
                                    <Calendar
                                        localizer={momentLocalizer(Moment)}
                                        events={calendar.events}
                                        defaultDate={new Date()}
                                        defaultView="month" />
                                </Route>
                            </section>
                        </Switch>
                    </section>
                    <SideMenuComp menuItems={items}/>
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

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);