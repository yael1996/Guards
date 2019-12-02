import React, { Component } from "react";
import { connect } from "react-redux";
import { State } from "../Store/store";
import { Dispatch } from "redux";

interface ReduxState extends State {

}

interface ReduxDispatch {

}

type Props = ReduxState & ReduxDispatch;

class DashBoard extends Component<Props> {
    render() {
        return (
            <div className="App" style={{height : '100%', width : '100%'}}>
                {/* <HeaderComp data={header}/>
                <section className="content-area">
                    <section className="main-area">
                        <Switch>
                            <Route path="/">
                                <ClientCalendar />
                            </Route>
                        </Switch>
                    </section>
                    <SideMenuComp data={menuItems}/>
                </section> */}
            </div>
        );
    }
}

const mapStateToProps = (state: State): ReduxState => {
    return state;
}

const mapDispatchToProps = (dispatch: Dispatch): ReduxDispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);