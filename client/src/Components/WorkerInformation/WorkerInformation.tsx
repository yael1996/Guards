import React, { Component } from "react";
import { UserState } from "../../Store/User/types";

interface Props {
    user: UserState
    isHired: boolean,
    onSelect: (user: UserState, hire: boolean) => void
}

class WorkerInformation extends Component<Props> {
    constructor(props: Props | undefined) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { onSelect, user, isHired } = this.props;
        onSelect && onSelect(user, isHired);
    }

    render() {
        const { isHired } = this.props;
        const { firstname, lastname, email } = this.props.user;
        const action = isHired? <button className="btn btn-link" onClick={this.onClick}>Fire</button>
                                : <button className="btn btn-link" onClick={this.onClick}>Hire</button>;
        return (
            <div className="card mx-3 mb-4">
                <section className="card-header">
                </section>
                <section className="card-body">
                    <p>{`${firstname} ${lastname}`}</p>
                    <p>{email}</p>
                </section>
                <section className="card-footer">
                    {action}
                </section>
            </div>
        );
    }
}

export default WorkerInformation;
