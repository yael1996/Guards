import React, { Component } from "react";
import { UserInformation } from "../../Store/types";
import "./UserInformation.css";

interface OwnProps {
    data: UserInformation
}

class UserInformationComp extends Component<OwnProps> {
    render() {
        const { imageSource } = this.props.data;
        return (
            <section className="user-information-wrapper">
                <section className="user-information-data">
                    Hello world
                </section>
                <section className="user-information-image-wrapper">
                    <img className="user-information-image" src={imageSource} />
                    logout button
                </section>
            </section>
        );
    }
}

export default UserInformationComp;