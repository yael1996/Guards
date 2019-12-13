import React, { Component } from "react";
import { RootState, AppDispatch } from "../../Store/store";
import { connect } from "react-redux";
import WorkerInformation from "../WorkerInformation/WorkerInformation";
import { UserState } from "../../Store/User/types";
import { History } from "history";
import { CompanyState, Company } from "../../Store/Company/types";
import { match } from "react-router";
import { getHirePotential } from "../../Store/User/actions";

interface OwnProps {
    history: History<any>,
    match: match<any>
}

interface ReduxProps {
    companies: CompanyState
}

interface ReduxDispatch {
    getHirePotential: () => Promise<UserState[]>
}

interface State {
    company: Company,
    users: UserState[],
    email: string
}

type Props = OwnProps & ReduxProps & ReduxDispatch;

class WorkerManager extends Component<Props, State> {
    constructor(props: Props | undefined) {
        super(props);
        this.initializeState();

        this.onHire = this.onHire.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    initializeState() {
        const { boardId } = this.props.match.params;
        const company = this.props.companies.find(x => x.id === boardId) as Company;
        this.state = {
            company,
            users: [],
            email: ""
        };
    }

    onHire(user: UserState) {

    }

    onSearch() {
        const { getHirePotential } = this.props;
        getHirePotential().then(users => this.setState({ users }));
    }

    render() {
        const { onHire, onSearch } = this;
        const { email } = this.state;
        const users = this.state.users.filter(user => user.email.includes(this.state.email)); 
        return (
            <>
                <div className="card d-flex flex-direction-column align-content-center mb-3">
                    <section className="d-flex flex-direction-column align-content-center">
                        <div className="input-group mb-1 px-4 py-4">
                            <section className="input-group-prepend">
                                <span className="input-group-text"> Email: </span>
                            </section>
                            <input type="text" className="form-control" placeholder="example@gmail.com" value={email} />
                            <button className="btn btn-primary ml-3" onClick={onSearch}>Search</button>
                        </div>
                    </section>
                </div>
                <div className="container-fluid d-flex flex-wrap">
                    {users.map((user) => <WorkerInformation user={user} onSelect={onHire} />)}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxProps => {
    const { companies } = state;
    return {
        companies
    };
}

const mapDispatchToProps = (dispatch: AppDispatch): ReduxDispatch => {
    return {
        getHirePotential: () => dispatch(getHirePotential())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkerManager);