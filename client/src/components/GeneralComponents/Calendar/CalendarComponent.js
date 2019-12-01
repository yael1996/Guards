import React, { Component } from "react";
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from "moment";
import {
    CalendarActions,
    // getUserEvents,
    myFunc
} from './CalendarActions';

import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

class ClientCalendar extends Component {
    state = {
        events: [
            // {
            //     start: new Date(),
            //     end: moment(new Date()).add(1, "days").toDate(),
            //     title: "Some title"
            // },
            // {
            //     start: new Date(),
            //     end: new Date(moment().add(5, "days")),
            //     title: "Gwee"
            // }
        ]
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        let a = new CalendarActions().getUserEvents()
            .then((res => {
               this.setState({events:res});
            }))
            .catch((err=>{
               alert(err);
            }));
    };

    render() {
        return (
            <Calendar
                localizer={localizer}
                defaultDate={new Date()}
                defaultView="month"
                events={this.state.events}
                style={{ height: "100vh" , width: "100vh" }}
            />
        );
    }
}

export default ClientCalendar;