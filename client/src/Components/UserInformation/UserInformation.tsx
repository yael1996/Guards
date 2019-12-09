import React, { Component } from "react";
import { UserState } from "../../Store/User/types";

interface Props {
    user: UserState
}

class UserInformationComp extends Component<Props> {
    render() {
        const { firstname, lastname } = this.props.user;
        return (
            <section className="card">
                <section className="card-body">
                    {/* <img className="rounded-circle" src={imageUrl} /> */}
                    <p>Welcome {`${firstname} ${lastname}`}</p>
                    <a href="#" className="btn btn-link">Logout</a>
                </section>
            </section>
        );
    }
}

export default UserInformationComp;