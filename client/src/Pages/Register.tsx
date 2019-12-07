import React, { Component } from "react";
import { RootState } from "../Store/store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { UserState } from "../Store/User/types";

interface ReduxState {
    user: UserState
}

interface ReduxDispatch {

}

type Props = ReduxState & ReduxDispatch;

class Register extends Component<Props> {
    constructor(props: Props | undefined) {
        super(props);
        this.registerUser = this.registerUser.bind(this);
        this.registerManager = this.registerManager.bind(this);
    }

    registerUser() {

    }

    registerManager() {

    }

    render() {
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
const mapDispatchToProps = (dispatch: Dispatch): ReduxDispatch => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);