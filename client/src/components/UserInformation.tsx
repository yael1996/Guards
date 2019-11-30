import React, { Component } from "react";
import { UserInformation } from "../store/types";

interface OwnProps {
    data: UserInformation
}

class UserInformationComp extends Component<OwnProps> {
    render() {
        const { imageSource } = this.props.data;
        return (
            <section className="user-information-wrapper">
                <img className="user-information-image" src={imageSource} />
            </section>
        );
    }
}

export default UserInformationComp;