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
            <article className="card w-25 d-inline-block  mx-4">
                <section className="card-body">
                    <h5 className="card-title">{title}</h5>
                </section>
                <section className="card-footer">
                    <a href="#" className="btn btn-link">Select</a>
                </section>
            </article>
        );
    }
}

export default CompanyComp;