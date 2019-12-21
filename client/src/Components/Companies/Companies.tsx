import React, { Component } from "react";
import { CompanyState, Company } from "../../Store/Company/types";
import CompanyComp from "../Company/Company";
import { History } from "history";

interface Props {
    amount?: number,
    companies: CompanyState,
    history: History<any>
}

class Companies extends Component<Props> {
    render() {
        const take = (n: number, companies: Company[]) => companies.filter((x: Company, index: number) => index < n);
        const { amount, companies, history } = this.props;
        return (
            <section className="d-flex flex-wrap justify-content-center">
                {take(amount || companies.length, companies).map((x) => {
                    return <CompanyComp key={x._id} company={x} history={history} />;
                })}
            </section>
        );
    }
}

export default Companies;