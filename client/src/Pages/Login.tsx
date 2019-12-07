import React, { Component } from "react";
import { RootState } from "../Store/store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { History, Location } from "history";
import { CalendarState } from "../Store/Calendar/types";
import { JSONUser } from "../../../server/src/mongo/models/user";
import { removeQuerySymbol, parseParams } from "../Utils/queryParamParse";
import config from "../config/config";

interface OwnProps {
    history: History,
    location: Location
}

interface ReduxState {
    calendar: CalendarState
}

interface ReduxDispatch {

}

type Props = OwnProps & ReduxState & ReduxDispatch;

class Login extends Component<Props> {
    constructor(props: any) {
        super(props);
    }

    loginPath() {
        return `${config.backendUri}/user/login`;
    }

    registerPage() {
        return `/register`
    }

    render() {
        const { location, history } = this.props;
        const { loginPath } = this;
        const params = parseParams(removeQuerySymbol(location.search));
        
        const data = JSON.parse(atob(params["user"])) as JSONUser;
        
        console.log(this.props.location);
        this.props.history.push(`/dashboard`);
        return (
            <section>
                Login page
            </section>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxState => {
    const { calendar } = state;
    return {
        calendar
    }
}
const mapDispatchToProps = (dispatch: Dispatch): ReduxDispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);