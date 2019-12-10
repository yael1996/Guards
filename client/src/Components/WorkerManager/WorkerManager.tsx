import React, { Component } from "react";
import { RootState, AppDispatch } from "../../Store/store";
import { connect } from "react-redux";

interface OwnProps {

}

interface ReduxProps {

}

interface ReduxDispatch {

}

type Props = OwnProps & ReduxProps & ReduxDispatch;

class WorkerManager extends Component<Props> {
    render() {
        return (
            <div className="container-fluid d-flex flex-direction-column align-content-center">
                <section className="class d-flex flex-direction-row justify-content center">
                    <span>test</span>
                    <span>test</span>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxProps => {
    return {

    };
}

const mapDispatchToProps = (dispatch: AppDispatch): ReduxDispatch => {
    return {

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WorkerManager);