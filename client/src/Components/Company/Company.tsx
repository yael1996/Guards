import React, { Component } from "react";
import { Company } from "../../Store/types";
import "./Company.css";

interface OwnProps {
    data: Company
}

class CompanyComp extends Component<OwnProps> {
    render() {
        const { name } = this.props.data;
        return (
            <article className="company-wrapper">
                company name: {name}
            </article>
        );
    }
}

export default CompanyComp;