import React, { Component } from "react";
import { RootState, AppDispatch } from "../Store/store";
import { connect } from "react-redux";
import { UserState, UserAction } from "../Store/User/types";
import { History, Location } from "history";
import { removeQuerySymbol, parseParams } from "../Utils/queryParamParse";
import { setUserSync, registerUser } from "../Store/User/actions";
import { JSONUser } from "../../../server/src/mongo/models/user";
import { USER_TYPE } from "../Store/User/types";
import config from "../config/config";

interface OwnProps {
    history: History,
    location: Location
}

interface State {
    params: {[key: string]: string}
}

interface ReduxState {
    user: UserState
}

interface ReduxDispatch {
    setUser: (user: JSONUser) => UserAction,
    registerUser: (user: UserState, type: number) => Promise<UserState>
}

type Props = OwnProps & ReduxState & ReduxDispatch;

class Register extends Component<Props, State> {
    constructor(props: Props | undefined) {
        super(props);
        this.registerUser = this.registerUser.bind(this);
        this.registerManager = this.registerManager.bind(this);
    }

    registerUser() {
        const { registerUser, user, history } = this.props;
        registerUser(user, USER_TYPE.WORKER).then(() => {
            history.push("/dashboard");
        });
    }

    registerManager() {
        const { registerUser, user, history } = this.props;
        registerUser(user, USER_TYPE.MANAGER).then(() => {
            history.push("/dashboard");
        });
    }

    render() {
        const { location, history, setUser } = this.props;
        const params = parseParams(removeQuerySymbol(location.search));
        let user: JSONUser | undefined = undefined;
        if (params["user"]) {
            user = JSON.parse(atob(params["user"])) as JSONUser;
        }
        if (user) {
            setUser(user);
            history.push(`/register/ready`);
        } else if (location.pathname !== "/register/ready") {
            window.location.replace(`${config.backendUri}/user/login`);
        }

        return (
            <section className="container-fluid d-flex justify-content-center align-content-center min-vw-100 min-vh-100">
                <section className="jumbotron my-5">
                    <h1>Welcome stranger!</h1>
                    <h3>
                        <p>Welcome stranger, we have noticed you aren't known to us!<br/>
                        First of all we wish to congratulate you for trying our application!<br/>
                        Before you'll continue we would require of you to complete just a single, trivial, tiny step.</p>
                        <br />
                        <p>Please answer; What is your role?</p>  
                    </h3>
                    <button className="btn btn-primary mr-3" onClick={this.registerUser}>I am a User</button>
                    <button className="btn btn-primary" onClick={this.registerManager}>I am a Manager</button>
                </section>
            </section>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxState => {
    const { user } = state;
    return {
        user
    };
}
const mapDispatchToProps = (dispatch: AppDispatch): ReduxDispatch => {
    return {
        setUser: (user: JSONUser) => dispatch(setUserSync(user)),
        registerUser: (user: UserState, type: number) => dispatch(registerUser(user, type))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);