import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState, AppDispatch, AppAction } from "../Store/store";
import HeaderComp from "../Components/Header/Header";
import { Switch, Route, match } from "react-router-dom";
import Moment from "moment";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import SideMenuComp from "../Components/SideMenu/SideMenu";
import { CompanyState } from "../Store/Company/types";
import { UserState } from "../Store/User/types";
import { CalendarState } from "../Store/Calendar/types";
import { MenuState } from "../Store/Menu/types";
import BoardCreation from "../Components/BoardCreation/BoardCreation";
import Companies from "../Components/Companies/Companies";
import { getEvents, optimise } from "../Store/Calendar/actions";
import { History } from "history";
import { JSONBoard } from "../../../server/src/mongo/models/Board";
import WorkerManager from "../Components/WorkerManager/WorkerManager";
import { loadPages } from "../Store/Menu/actions";
import { getCompanies } from "../Store/Company/actions";

interface OwnProps {
    history: History<any>,
    match: match<any>
}

interface ReduxState {
    companies: CompanyState,
    user: UserState,
    calendar: CalendarState,
    menu: MenuState
}

interface ReduxDispatch {
    getEvents: (boardId: string, year: number, month: number) => Promise<Event[]>,
    getMenu: (user: UserState) => AppAction,
    getCompanies: (user: UserState) => Promise<CompanyState>,
    optimise: (boardId: string, year: number, month: number) => Promise<void>
}

type Props = OwnProps & ReduxState & ReduxDispatch;

class DashBoard extends Component<Props> {
    constructor(props: any) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);
        this.refreshView = this.refreshView.bind(this);
        this.optimise = this.optimise.bind(this);
    }

    refreshView() {
        const { user, getCompanies, getMenu } = this.props;
        getCompanies(user);
        getMenu(user);
    }

    componentWillMount() {
        this.refreshView();
    }

    onDateChange(date: Date) {
        const { history } = this.props;
        const { boardId } = this.props.calendar;
        const year = date.getFullYear();
        const month = date.getMonth();
        this.props.getEvents(boardId, year, month).then(() => {
            history.push(`/dashboard/${boardId}/${year}/${month}`);
        });
    }

    optimise(match: match<any> | null) {
        return () => {
            if (match !== null) {
                const { boardId, year, month } = match.params;
                this.props.optimise(boardId, +year, +month);
            }
        }
    }

    render() {
        const { optimise } = this;
        const { companies, user, calendar } = this.props;
        const { items } = this.props.menu;
        const onDateChange = this.onDateChange;

        return (
            <div className="App">
                <Switch>
                    <Route path="/dashboard" children={({ history }) => (
                        <HeaderComp amount={3} history={history} />
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
                                    <BoardCreation history={history} />
                                )} />
                                <Route exact path="/dashboard/:boardId/:year/:month" children={({ match }) => {
                                    return (
                                        <>
                                            <section>
                                                <button className="btn btn-link" onClick={optimise(match)} >
                                                    <p>Optimise</p>
                                                </button>
                                            </section>
                                            <Calendar className="min-vh-100"
                                                localizer={momentLocalizer(Moment)}
                                                events={calendar.events}
                                                defaultDate={new Date()}
                                                defaultView="month"
                                                onNavigate={function (newDate: Date) { onDateChange(newDate); }}
                                                views={{
                                                    month: true
                                                }} />
                                        </>
                                    )
                                }} />
                                <Route exact path="/dashboard/:boardId" children={({ history, match }) => (
                                    <WorkerManager history={history} match={match} />
                                )} />
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
        getEvents: (boardId: string, year: number, month: number) => dispatch(getEvents(boardId, year, month)),
        getMenu: (user: UserState) => dispatch(loadPages(user)),
        getCompanies: (user: UserState) => dispatch(getCompanies(user)),
        optimise: (boardId: string, year: number, month: number) => dispatch(optimise(boardId, year, month))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);