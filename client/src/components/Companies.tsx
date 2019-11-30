import React, { Component } from "react";
import { Company } from "../store/types";
import CompanyComp from "./Company";

interface OwnProps {
    data: Company[]
}

class Companies extends Component<OwnProps> {
    render() {
        const { data } = this.props;
        return (
            <section>
                {data.map((x) => {
                    return <CompanyComp data={x} />;
                })}
            </section>
        );
    }
}

export default Companies;