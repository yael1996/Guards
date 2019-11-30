import React, { Component } from "react";
import { Header } from "../store/types";
import "../Styles/Header.css";
import CompaniesComp from "./Companies";
import UserInformationComp from "./UserInformation";

interface OwnProps {
    data: Header
}

class HeaderComp extends Component<OwnProps> {
    render() {
        const { companies, userInformation } = this.props.data;
        return (
            <header className="header-wrapper">
                <CompaniesComp data={companies}></CompaniesComp>
                <UserInformationComp data={userInformation}></UserInformationComp>
            </header>
        );
    }
}

export default HeaderComp;