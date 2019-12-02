import React, { Component } from "react";
import { connect } from "react-redux";
import { State } from "../Store/store";
import { Dispatch } from "redux";
import { Header, SideMenuItem } from "../Store/types";
import HeaderComp from "../Components/Header/Header";
import { Switch, Route, match } from "react-router-dom";
import SideMenuComp from "../Components/SideMenu/SideMenu";

interface ReduxState {
    header: Header
    menuItems: SideMenuItem[]
}

interface ReduxDispatch {

}

type Props = ReduxState & ReduxDispatch;

class DashBoard extends Component<Props> {
    render() {
        const { header, menuItems } = this.props;
        return (
            <div className="App" style={{height : '100%', width : '100%'}}>
                <HeaderComp data={header}/>
                <section className="content-area">
                    <section className="main-area">
                        <Switch>
                            <Route path="/dashboard">
                                test
                                {/* <ClientCalendar /> */}
                            </Route>
                        </Switch>
                    </section>
                    <SideMenuComp data={menuItems}/>
                </section>
            </div>
        );
    }
}

const mapStateToProps = (state: State): ReduxState => {
    return {
        header: state.header,
        menuItems: state.menuItems
    };
}

const mapDispatchToProps = (dispatch: Dispatch): ReduxDispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);