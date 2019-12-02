import React, { Component } from "react";
import store from "./Store/store"
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Styles/App.css";
import {CalendarActions} from "./Pages/Calendar/CalendarActions";
import Login from "./Pages/Login";

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

export default App;