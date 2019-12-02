import React, { Component } from "react";
import { UserState } from "../../Store/User/types";
import "./UserInformation.css";

interface Props {
    user: UserState
}

class UserInformationComp extends Component<Props> {
    render() {
        const { imageUrl } = this.props.user;
        return (
            <section className="user-information-wrapper">
                <section className="user-information-data">
                    Hello world
                </section>
                <section className="user-information-image-wrapper">
                    <img className="user-information-image" src={imageUrl} />
                    logout button
                </section>
            </section>
        );
    }
}

export default UserInformationComp;