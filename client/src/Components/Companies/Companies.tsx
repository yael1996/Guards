import React, { Component } from "react";
import { CompanyState, Company } from "../../Store/Company/types";
import CompanyComp from "../Company/Company";

interface Props {
    amount?: number,
    companies: CompanyState
}

class Companies extends Component<Props> {
    render() {
        const take = (n: number, companies: Company[]) => companies.filter((x: Company, index: number) => index < n);
        const { amount, companies } = this.props;
        return (
            <section className="d-flex flex-wrap justify-content-center">
                {take(amount || companies.length, companies).map((x) => {
                    return <CompanyComp key={x.id} company={x} />;
                })}
            </section>
        );
    }
}

export default Companies;