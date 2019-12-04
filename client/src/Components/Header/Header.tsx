import React, { Component } from "react";
import { CompanyState } from "../../Store/Company/types";
import CompaniesComp from "../Companies/Companies";
import UserInformationComp from "../UserInformation/UserInformation";
import { UserState } from "../../Store/User/types";

interface Props {
    amount: number,
    companies: CompanyState,
    user: UserState
}

class HeaderComp extends Component<Props> {
    render() {
        const { amount, companies, user } = this.props;
        // const displayedCompanies = companies.filter((x, index) => index < 3);
        return (
            <header className="container-fluid bg-light pt-3">
                <section className="row">
                    <section className="col-9">
                        <CompaniesComp companies={companies} amount={amount}></CompaniesComp>
                    </section>
                    <section className="col-3">
                        <UserInformationComp user={user}></UserInformationComp>
                    </section>
                </section>
            </header>
        );
    }
}

export default HeaderComp;