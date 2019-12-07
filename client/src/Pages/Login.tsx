import React, { Component } from "react";
import { RootState, AppDispatch, AppAction } from "../Store/store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { History, Location } from "history";
import { CalendarState } from "../Store/Calendar/types";
import { JSONUser } from "../../../server/src/mongo/models/user";
import { removeQuerySymbol, parseParams } from "../Utils/queryParamParse";
import config from "../config/config";
import { setUser, setUserSync } from "../Store/User/actions";

interface OwnProps {
    history: History,
    location: Location
}

interface ReduxState {
    calendar: CalendarState
}

interface ReduxDispatch {
    setUser: (user: JSONUser) => AppAction
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
        const params = parseParams(removeQuerySymbol(location.search));
        
        if (params["user"]) {
            const user = JSON.parse(atob(params["user"])) as JSONUser;
            setUser(user);
            history.push("/dashboard");
        } else {
            window.location.replace(`${config.backendUri}/user/login`);
        }
        return (<></>);
    }
}

const mapStateToProps = (state: RootState): ReduxState => {
    const { calendar } = state;
    return {
        calendar
    }
}
const mapDispatchToProps = (dispatch: AppDispatch): ReduxDispatch => {
    return {
        setUser: (user: JSONUser) => dispatch(setUserSync(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);