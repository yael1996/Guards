import React, { Component } from "react";
import { Header } from "../../Store/types";
import "./Header.css";
import CompaniesComp from "../Companies/Companies";
import UserInformationComp from "../UserInformation/UserInformation";

interface OwnProps {
    data: Header
}

class HeaderComp extends Component<OwnProps> {
    render() {
        const { companies, userInformation } = this.props.data;
        return (
            <header className="header-wrapper">
                {/* <CompaniesComp data={companies}></CompaniesComp>
                <UserInformationComp data={userInformation}></UserInformationComp> */}
            </header>
        );
    }
}

export default HeaderComp;