import React, { Component } from "react";
import store, { State } from "./store/store"
import { Provider, connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HeaderComp from "./Components/Header/Header";
import SideMenuComp from "./Components/SideMenu/SideMenu";
import "./Styles/App.css";
import ClientCalendar from "./Pages/Calendar/CalendarComponent";
import {CalendarActions} from "./Pages/Calendar/CalendarActions";
import Login from "./Pages/Login";
// import {myFunc} from "./Pages/Calendar/CalendarActions";

// interface OwnProps {
    
// }

// interface ReduxDispatch {

// }

// type Props = OwnProps & State & ReduxDispatch

class App extends Component {

    componentDidMount() {
        // this.fetchData();
    }

    fetchData = () => {

        // .then(events => {
        let a = new CalendarActions().myFunc();
        //             // return events;
        //             this.setState({events});
        //         });
    };

    render() {
        // const { header, menuItems } = this.props;
        // return (
        //     <Router>
        //         <div className="App" style={{height : '100%', width : '100%'}}>
        //             <HeaderComp data={header}/>
        //             <section className="content-area">
        //                 <section className="main-area">
        //                     <Switch>
        //                         <Route path="/">
        //                             <ClientCalendar />
        //                         </Route>
        //                     </Switch>
        //                 </section>
        //                 <SideMenuComp data={menuItems}/>
        //             </section>
        //         </div>
        //     </Router>
        // );
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/">
                            <Login />
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        );
    }
}

// const mapStateToProps = (state: State, props: OwnProps): State => {
//     return state;
// }
// const mapDispatchToProps = (state: State, props: OwnProps): ReduxDispatch => {
//     return {

//     }
// }

// export default connect<State, ReduxDispatch, OwnProps>(mapStateToProps)(App);

export default App;