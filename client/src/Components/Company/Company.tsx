import React, { Component } from "react";
import { Company } from "../../Store/Company/types";
import "./Company.css";
import { History } from "history";
import { CalendarState, CalendarAction } from "../../Store/Calendar/types";
import { RootState, AppDispatch } from "../../Store/store";
import { set, getEvents } from "../../Store/Calendar/actions";
import { connect } from "react-redux";
import { UserState } from "../../Store/User/types";
import { Event } from "react-big-calendar";

interface ReduxProps {
    user: UserState
}

interface ReduxDispatch {
    select: (state: CalendarState) => CalendarAction,
    getEvents: (boardId: string, year: number, month: number) => Promise<Event[]>
}

interface OwnProps {
    company: Company,
    history: History<any>
}

type Props = ReduxProps & ReduxDispatch & OwnProps;

class CompanyComp extends Component<Props> {
    constructor(props: Props | undefined) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onWorkers = this.onWorkers.bind(this);
    }

    onMouseDown() {
        const { getEvents, history } = this.props;
        const { _id } = this.props.company;
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        this.props.select({
            boardId: _id || "",
            currentDate: new Date(year, month),
            events: [] 
        });
        getEvents(_id || "", year, month).then(
            () => history.push(`/dashboard/${_id}/${year}/${month}`)
        );
    }

    onWorkers() {
        const { history, company } = this.props;
        history.push(`/dashboard/${company._id}`);
    }

    render() {
        const { name } = this.props.company;
        const isManager = this.props.user.type === "manager";
        return (
            <article className="card w-25 d-inline-block mx-4 my-4">
                <section className="card-body">
                    <h5 className="card-title">{name}</h5>
                </section>
                <section className="card-footer">
                    <a href="#" onMouseDown={this.onMouseDown} className="btn btn-link">Select</a>
                    { isManager && <a href="#" onMouseDown={this.onWorkers} className="btn btn-link">Workers</a> }
                </section>
            </article>
        );
    }
}

const mapStateToProps = (state: RootState, props: OwnProps): ReduxProps => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch: AppDispatch, props: OwnProps): ReduxDispatch => {
    return {
        select: (state: CalendarState) => dispatch(set(state)),
        getEvents: (boardId: string, year: number, month: number) => dispatch(getEvents(boardId, year, month)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyComp);