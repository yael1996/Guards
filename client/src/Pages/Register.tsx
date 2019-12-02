import React, { Component } from "react";
import { State } from "../Store/store";
import { Dispatch } from "redux";
import { connect } from "react-redux";

interface ReduxState {

}

interface ReduxDispatch {

}

type Props = ReduxState & ReduxDispatch;

class Register extends Component<Props> {
    render() {
        return (
            <section>
                Register page
            </section>
        );
    }
}

const mapStateToProps = (state: State): ReduxState => {
    return state;
}
const mapDispatchToProps = (dispatch: Dispatch): ReduxDispatch => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);