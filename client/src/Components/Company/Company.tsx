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
    }

    onMouseDown() {
        const { history } = this.props;
        const { id } = this.props.company;
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        history.push(`/dashboard/${id}/${year}/${month}`);
    }
    
    render() {
        const { title } = this.props.company;
        return (
            <article className="card w-25 d-inline-block mx-4 my-4">
                <section className="card-body">
                    <h5 className="card-title">{title}</h5>
                </section>
                <section className="card-footer">
                    <a href="#" onMouseDown={this.onMouseDown} className="btn btn-link">Select</a>
                </section>
            </article>
        );
    }
}

export default CompanyComp;