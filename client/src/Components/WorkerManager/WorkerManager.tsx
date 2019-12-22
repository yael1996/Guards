import React, { Component } from "react";
import { RootState, AppDispatch } from "../../Store/store";
import { connect } from "react-redux";
import WorkerInformation from "../WorkerInformation/WorkerInformation";
import { UserState } from "../../Store/User/types";
import { History } from "history";
import { CompanyState, Company } from "../../Store/Company/types";
import { match } from "react-router";
import { getHirePotential } from "../../Store/User/actions";
import { hire, fire } from "../../Store/Company/actions";

interface OwnProps {
    history: History<any>,
    match: match<any>
}

interface ReduxProps {
    companies: CompanyState
}

interface ReduxDispatch {
    getHirePotential: () => Promise<UserState[]>,
    hire: (company: Company, user: UserState) => Promise<Company>,
    fire: (company: Company, user: UserState) => Promise<Company>
}

interface State {
    users: UserState[],
    email: string
}

type Props = OwnProps & ReduxProps & ReduxDispatch;

class WorkerManager extends Component<Props, State> {
    constructor(props: Props | undefined) {
        super(props);
        this.initializeState();

        this.company = this.company.bind(this);
        this.onHire = this.onHire.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    initializeState() {
        this.state = {
            users: [],
            email: ""
        };
    }

    company() {
        const { boardId } = this.props.match.params;
        return this.props.companies.find(x => x._id === boardId) as Company;
    }

    onHire(user: UserState, isHired: boolean) {
        const company = this.company();
        const { hire, fire } = this.props;

        if (isHired) {
            fire(company, user);
        } else {
            hire(company, user);
        }
    }

    onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value: email } = event.target;
        this.setState({
            email
        });
    }

    onSearch() {
        const { getHirePotential } = this.props;
        getHirePotential().then(users => this.setState({ users }));
    }

    render() {
        const { onHire, onSearch, onSearchChange } = this;
        const company = this.company();
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
                            <input type="text" className="form-control" onChange={onSearchChange} placeholder="example@gmail.com" value={email} />
                            <button className="btn btn-primary ml-3" onClick={onSearch}>Search</button>
                        </div>
                    </section>
                </div>
                <div className="container-fluid d-flex flex-wrap">
                    {users.map((user) => {
                        const { _id } = user;
                        const isHired = company.workerIds.includes(_id);
                        return <WorkerInformation key={_id} user={user} isHired={isHired} onSelect={onHire} />
                    })}
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
        getHirePotential: () => dispatch(getHirePotential()),
        hire: (company: Company, user: UserState) => dispatch(hire(company, user)),
        fire: (company: Company, user: UserState) => dispatch(fire(company, user))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkerManager);