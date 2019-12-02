import React, { Component } from "react";
import { CompanyState } from "../../Store/Company/types";
import "./Companies.css";
import CompanyComp from "../Company/Company";

interface Props {
    companies: CompanyState
}

class Companies extends Component<Props> {
    render() {
        const { companies } = this.props;
        return (
            <section className="companies-wrapper">
                {companies.map((x) => {
                    return <CompanyComp key={x.id} company={x} />;
                })}
            </section>
        );
    }
}

export default Companies;