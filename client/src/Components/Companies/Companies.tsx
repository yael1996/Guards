import React, { Component } from "react";
import { Company } from "../../store/types";
import "./Companies.css";
import CompanyComp from "../Company/Company";

interface OwnProps {
    data: Company[]
}

class Companies extends Component<OwnProps> {
    render() {
        const { data } = this.props;
        return (
            <section className="companies-wrapper">
                {/* {data.map((x) => {
                    return <CompanyComp data={x} />;
                })} */}
            </section>
        );
    }
}

export default Companies;