import React, { Component } from "react";
import FS from './Pages/Calendar/ClientCalendar';

import "./Styles/App.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {DateLocalizer} from "react-big-calendar";


class App extends Component {
    render() {
        return (
            <div className="App" style={{height : '100%', width : '100%'}}>
                <FS messages={date: 'Date',
                    time: 'Time',
                    event: 'Event',
                    allDay: 'All Day',
                    week: 'Week',
                    work_week: 'Work Week',
                    day: 'Day',
                    month: 'Month',
                    previous: 'Back',
                    next: 'Next',
                    yesterday: 'Yesterday',
                    tomorrow: 'Tomorrow',
                    today: 'Today',
                    agenda: 'Agenda',
                    noEventsInRange: 'There are no events in this range.',
                } localizer={DateLocalizer}/>
            </div>
        );
    }
}

export default App;