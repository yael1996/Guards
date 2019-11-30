import React, { Component } from "react";
import { UserInformation } from "../store/types";
import "../Styles/UserInformation.css";

interface OwnProps {
    data: UserInformation
}

class UserInformationComp extends Component<OwnProps> {
    render() {
        const { imageSource } = this.props.data;
        return (
            <section className="user-information-wrapper">
                this is user information
                <img className="user-information-image" src={imageSource} />
            </section>
        );
    }
}

export default UserInformationComp;