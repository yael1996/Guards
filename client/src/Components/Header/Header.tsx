import React, { Component } from "react";
import { CompanyState } from "../../Store/Company/types";
import CompaniesComp from "../Companies/Companies";
import UserInformationComp from "../UserInformation/UserInformation";
import { UserState } from "../../Store/User/types";
import { History } from "history";
import { connect } from "react-redux";
import { RootState } from "../../Store/store";

interface OwnProps {
    history: History<any>,
    amount: number
}

interface ReduxProps {
    companies: CompanyState
}

type Props = OwnProps & ReduxProps;

class HeaderComp extends Component<Props> {
    render() {
        const { amount, companies, history } = this.props;
        // const displayedCompanies = companies.filter((x, index) => index < 3);
        return (
            <header className="container-fluid bg-light pt-3">
                <section className="row">
                    <section className="col-9">
                        <CompaniesComp companies={companies} amount={amount} history={history} />
                    </section>
                    <section className="col-3">
                        <UserInformationComp history={history} />
                    </section>
                </section>
            </header>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxProps => {
    const { companies } = state;
    return {
        companies
    }
}

export default  connect(mapStateToProps)(HeaderComp);