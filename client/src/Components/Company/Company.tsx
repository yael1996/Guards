import React, { Component } from "react";
import { Company } from "../../Store/Company/types";
import "./Company.css";
import { History } from "history";

interface Props {
    company: Company,
    history: History<any>
}

class CompanyComp extends Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.onWorkers = this.onWorkers.bind(this);
    }

    onMouseDown() {
        const { history } = this.props;
        const { id } = this.props.company;
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        history.push(`/dashboard/${id}/${year}/${month}`);
    }

    onWorkers() {
        const { history, company } = this.props;
        history.push(`/dashboard/${company.id}`);
    }
    
    render() {
        const { name } = this.props.company;
        return (
            <article className="card w-25 d-inline-block mx-4 my-4">
                <section className="card-body">
                    <h5 className="card-title">{name}</h5>
                </section>
                <section className="card-footer">
                    <a href="#" onMouseDown={this.onMouseDown} className="btn btn-link">Select</a>
                    <a href="#" onMouseDown={this.onWorkers} className="btn btn-link">Workers</a>
                </section>
            </article>
        );
    }
}

export default CompanyComp;