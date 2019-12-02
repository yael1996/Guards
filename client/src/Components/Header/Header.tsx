import React, { Component } from "react";
import { CompanyState, Company } from "../../Store/Company/types";
import "./Header.css";
import CompaniesComp from "../Companies/Companies";
import UserInformationComp from "../UserInformation/UserInformation";
import { UserState } from "../../Store/User/types";

interface Props {
    companies: CompanyState,
    user: UserState
}

class HeaderComp extends Component<Props> {
    render() {
        const { companies, user } = this.props;
        const displayedCompanies = companies.filter((x, index) => index < 3);
        return (
            <header className="header-wrapper">
                <CompaniesComp companies={displayedCompanies}></CompaniesComp>
                <UserInformationComp user={user}></UserInformationComp>
            </header>
        );
    }
}

export default HeaderComp;