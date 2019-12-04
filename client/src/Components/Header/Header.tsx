import React, { Component } from "react";
import { CompanyState } from "../../Store/Company/types";
import CompaniesComp from "../Companies/Companies";
import UserInformationComp from "../UserInformation/UserInformation";
import { UserState } from "../../Store/User/types";
import { History } from "history";

interface Props {
    amount: number,
    companies: CompanyState,
    user: UserState,
    history: History<any>
}

class HeaderComp extends Component<Props> {
    render() {
        const { amount, companies, user, history } = this.props;
        // const displayedCompanies = companies.filter((x, index) => index < 3);
        return (
            <header className="container-fluid bg-light pt-3">
                <section className="row">
                    <section className="col-9">
                        <CompaniesComp companies={companies} amount={amount} history={history} />
                    </section>
                    <section className="col-3">
                        <UserInformationComp user={user} />
                    </section>
                </section>
            </header>
        );
    }
}

export default HeaderComp;