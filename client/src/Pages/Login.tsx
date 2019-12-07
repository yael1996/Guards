import React, { Component } from "react";
import { RootState } from "../Store/store";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { History, Location } from "history";

interface OwnProps {
    history: History,
    location: Location
}

interface ReduxState {

}

interface ReduxDispatch {

}

type Props = OwnProps & ReduxState & ReduxDispatch;

class Login extends Component<Props> {
    constructor(props: any) {
        super(props);
    }

    render() {
        console.log(this.props.location);
        return (
            <section>
                Login page
            </section>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxState => {
    return state;
}
const mapDispatchToProps = (dispatch: Dispatch): ReduxDispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);