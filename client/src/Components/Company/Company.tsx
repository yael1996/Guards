import React, { Component } from "react";
import { Company } from "../../Store/Company/types";
import "./Company.css";

interface Props {
    company: Company
}

class CompanyComp extends Component<Props> {
    render() {
        const { title } = this.props.company;
        return (
            <article className="company-wrapper">
                <h3>{title}</h3>
            </article>
        );
    }
}

export default CompanyComp;