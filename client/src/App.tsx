import React, { Component } from "react";
import store from "./Store/store"
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import DashBoard from "./Pages/DashBoard";

class App extends Component {
    render() {
        return (
            <div className="min-vh-100 bg-light">
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route path="/dashboard">
                            <DashBoard />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/">
                            <Login />
                        </Route>
                    </Switch>
                </Router>
            </Provider>
            </div>
        );
    }
}

export default App;