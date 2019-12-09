import React, { Component } from "react";
import { UserState } from "../../Store/User/types";
import { AppAction, RootState, AppDispatch } from "../../Store/store";
import { logout } from "../../Store/User/actions";
import { History } from "history";
import { connect } from "react-redux";

interface OwnProps {
    history: History<any>
}

interface ReduxProps {
    user: UserState
}

interface ReduxDispatch {
    logout: () => AppAction
}

type Props = OwnProps & ReduxProps & ReduxDispatch;

class UserInformationComp extends Component<Props> {
    constructor(props: Props | undefined) {
        super(props);
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        const { logout, history } = this.props;
        logout();
        history.push("/");
        
    }

    render() {
        const { imageUrl, firstname, lastname } = this.props.user;
        const { onLogout } = this;
        return (
            <section className="card">
                <section className="card-body">
                    <img className="rounded-circle" width="150px" src={imageUrl} />
                    <p>Welcome {`${firstname} ${lastname}`}</p>
                    <button className="btn btn-link" onClick={onLogout}>Logout</button>
                </section>
            </section>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxProps => {
    const { user } = state;
    return {
        user
    }
}

const mapDispatchToProps = (dispatch: AppDispatch): ReduxDispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInformationComp);