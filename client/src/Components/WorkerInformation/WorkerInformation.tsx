import React, { Component } from "react";
import { UserState } from "../../Store/User/types";

interface Props {
    user: UserState
    onSelect: (user: UserState) => void
}

class WorkerInformation extends Component<Props> {
    constructor(props: Props | undefined) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const { onSelect, user } = this.props;
        onSelect && onSelect(user);
    }

    render() {
        // const { firstname, lastname,  } = this.props.user;
        return (
            <div className="card mx-3">
                <section className="card-header">
                    {/* <p>Name: {`${firstname} ${lastname}`}</p> */}
                </section>
                <section className="card-body">

                </section>
                <section className="card-footer">
                    <button onClick={this.onClick}>Hire</button>
                </section>
            </div>
        );
    }
}

export default WorkerInformation;
