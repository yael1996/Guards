import React, { Component } from "react";
import { CompanyState } from "../../Store/Company/types";
import CompanyComp from "../Company/Company";

interface Props {
    companies: CompanyState
}

class Companies extends Component<Props> {
    render() {
        const { companies } = this.props;
        return (
            <section className="d-flex justify-content-center">
                {companies.map((x) => {
                    return <CompanyComp key={x.id} company={x} />;
                })}
            </section>
        );
    }
}

export default Companies;