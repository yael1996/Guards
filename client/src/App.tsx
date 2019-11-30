import * as React from "react";
import * as ReactDOM from "react-dom";

import "./Styles/App.css";
import ClientCalendar from './components/GeneralComponents/Calendar/CalendarComponent.js'
// import ClientCalendar from "./components/GeneralComponents/Calendar/CalendarComponent";
import {CalendarActions} from "./components/GeneralComponents/Calendar/CalendarActions";
import {Component} from "react";
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
    //         <h1>HI!</h1> )
            <div className="App" style={{height : '100%', width : '100%'}}>
                <ClientCalendar />
            </div>
        );
    }
}

export default App;