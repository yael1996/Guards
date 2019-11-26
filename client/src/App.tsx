import React, { Component } from "react";

import "./Styles/App.css";
import ClientCalendar from "./Pages/Calendar/CalendarComponent";
import {CalendarActions} from "./Pages/Calendar/CalendarActions";
// import {myFunc} from "./Pages/Calendar/CalendarActions";




class App extends Component {

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {

        // .then(events => {
        let a = new CalendarActions().myFunc();
        //             // return events;
        //             this.setState({events});
        //         });
    };

    render() {
        return (
            <div className="App" style={{height : '100%', width : '100%'}}>
               <ClientCalendar />
            </div>
        );
    }
}

export default App;