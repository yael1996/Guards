import React, { Component } from "react";

type DayMap = [boolean, boolean, boolean, boolean, boolean, boolean, boolean];

interface ShiftSettings {
    length: string,
    amount: string,
    workerCount: string
}

interface Props {

}

interface State {
    standardDays: DayMap,
    standardShiftSettings: ShiftSettings,
    specialDays: DayMap,
    specialShiftSettings: ShiftSettings,
    withHolidays: boolean,
    holidayShiftSettings: ShiftSettings
}

type ShiftUpdate = (settings: ShiftSettings, e: React.ChangeEvent<HTMLInputElement>) => ShiftSettings;

class BoardCreation extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            standardDays: [false, false, true, false, false, false, false],
            standardShiftSettings: {
                length: "",
                amount: "",
                workerCount: ""
            },
            specialDays: [false, false, false, false, true, false, false],
            specialShiftSettings: {
                length: "",
                amount: "",
                workerCount: ""
            },
            withHolidays: false,
            holidayShiftSettings: {
                length: "",
                amount: "",
                workerCount: ""
            }
        }
        this.markDay = this.markDay.bind(this);
        this.allowOnlyNumbers = this.allowOnlyNumbers.bind(this);
        this.length = this.length.bind(this);
        this.amount = this.amount.bind(this);
        this.workerCount = this.workerCount.bind(this);
        this.updateStandardSettings = this.updateStandardSettings.bind(this);
        this.updateSpecialSettings = this.updateSpecialSettings.bind(this);
        this.updateHolidaySettings = this.updateHolidaySettings.bind(this);
    }

    markDay(type: string, contrastsWith: DayMap[]) {
        return (ordinal: number) => {
            const isTaken = (ordinal: number) => (dayMap: DayMap) => dayMap[ordinal];
            const or = (base: boolean, x: boolean) => base || x;

            const conflicts = contrastsWith.map(isTaken(ordinal)).reduce(or, false);
            if (!conflicts) {
                let dayMap: DayMap;
                switch (type) {
                    case "standard":
                        dayMap = this.state.standardDays;
                        break;
                    case "special":
                        dayMap = this.state.specialDays;
                        break;
                    default:
                        throw new Error("Bad type");
                }
                dayMap[ordinal] = !dayMap[ordinal];

                let newState: State;
                switch (type) {
                    case "standard":
                        newState = Object.assign({}, this.state, { standardDays: dayMap });
                        break;
                    case "special":
                        newState = Object.assign({}, this.state, { specialDays: dayMap });
                        break;
                    default:
                        throw new Error("Bad type");
                }
                this.setState(newState);    
            }
        }
    }

    length(settings: ShiftSettings, e: React.ChangeEvent<HTMLInputElement>) {
        return Object.assign({}, settings, { length: e.target.value });
    }

    amount(settings: ShiftSettings, e: React.ChangeEvent<HTMLInputElement>) {
        return Object.assign({}, settings, { amount: e.target.value });
    }

    workerCount(settings: ShiftSettings, e: React.ChangeEvent<HTMLInputElement>) {
        return Object.assign({}, settings, { workerCount: e.target.value });
    }

    updateStandardSettings(fn: ShiftUpdate) {
        const that = this;
        return function(e: React.ChangeEvent<HTMLInputElement>) {
            const settings = fn(that.state.standardShiftSettings, e);
            const newState = Object.assign({}, that.state, { standardShiftSettings: settings });
            that.setState(newState);
        }
    }

    updateSpecialSettings(fn: ShiftUpdate) {
        const that = this;
        return function(e: React.ChangeEvent<HTMLInputElement>) {
            const settings = fn(that.state.specialShiftSettings, e);
            that.setState(Object.assign({}, that.state, { specialShiftSettings: settings }));
        }
    }

    updateHolidaySettings(fn: ShiftUpdate) {
        const that = this;
        return function(e: React.ChangeEvent<HTMLInputElement>) {
            const settings = fn(that.state.holidayShiftSettings, e);
            that.setState(Object.assign({}, that.state, { holidayShiftSettings: settings }));
        }
    }

    allowOnlyNumbers(fn: (e: React.ChangeEvent<HTMLInputElement>) => void) {
        return function(e: React.ChangeEvent<HTMLInputElement>) {
            if (+e.target.value || e.target.value === "") {
                fn(e);
            }
        }
    }

    render() {
        const { standardDays, specialDays, withHolidays } = this.state;
        const { standardShiftSettings, specialShiftSettings, holidayShiftSettings } = this.state;
        const { length, amount, workerCount } = this;
        const markStandard = this.markDay("standard", [specialDays]);
        const markSpecial = this.markDay("special", [standardDays]);
        const standard = (fn: ShiftUpdate) => this.allowOnlyNumbers(this.updateStandardSettings(fn));
        const special = (fn: ShiftUpdate) => this.allowOnlyNumbers(this.updateSpecialSettings(fn));
        const holiday = (fn: ShiftUpdate) => this.allowOnlyNumbers(this.updateHolidaySettings(fn));
        return (
            <div className="container-fluid mb-3">
                <div className="row d-flex flex-column align-content-center">
                    <section className="card w-75 mb-3">
                        <section className="card-header d-flex">
                            <button className="btn btn-link">
                                <h4 className="mb-0">Standard days</h4>
                            </button>
                        </section>
                        <section className="card-body">
                            <p>Standard days</p>
                            <span className="d-flex justify-content-center mb-5">
                                {standardDays.map((x, index) =>  {
                                    if (x) {
                                        return <button key={index} onClick={() => markStandard(index)} className="btn btn-primary mx-1">{index + 1}</button>;
                                    } else {
                                        return <button key={index} onClick={() => markStandard(index)} className="btn btn-secondary mx-1">{index + 1}</button>;
                                    }
                                })}
                            </span>
                            <span className="d-flex flex-column">
                                <p>Shift length: <input type="text" onChange={standard(length)} value={standardShiftSettings.length}/></p>
                                <p>Number of shifts: <input type="text" onChange={standard(amount)} value={standardShiftSettings.amount}/></p>
                                <p>Workers needed: <input type="text" onChange={standard(workerCount)} value={standardShiftSettings.workerCount}/></p>
                            </span>
                        </section>
                    </section>
                    <section className="card w-75 mb-3">
                        <section className="card-header d-flex">
                            <button className="btn btn-link">
                                <h4 className="mb-0">Special days</h4>
                            </button>
                        </section>
                        <section className="card-body">
                        <p>Special days</p>
                            <span className="d-flex justify-content-center mb-5">
                                {specialDays.map((x, index) => {
                                    if (x) {
                                        return <button key={index} onClick={() => markSpecial(index)} className="btn btn-primary mx-1">{index + 1}</button>;
                                    } else {
                                        return <button key={index} onClick={() => markSpecial(index)} className="btn btn-secondary mx-1">{index + 1}</button>;
                                    }
                                })}
                            </span>
                            <span className="d-flex flex-column">
                                <p>Shift length: <input type="text" onChange={special(length)} value={specialShiftSettings.length}/></p>
                                <p>Number of shifts: <input type="text" onChange={special(amount)} value={specialShiftSettings.amount}/></p>
                                <p>Workers needed: <input type="text" onChange={special(workerCount)} value={specialShiftSettings.workerCount}/></p>
                            </span>
                        </section>
                    </section>
                    <section className="card w-75 mb-3">
                        <section className="card-header d-flex">
                            <button className="btn btn-link">
                                <h4 className="mb-0">Holidays</h4>
                            </button>
                        </section>
                        <section className="card-body">
                            <span className="d-flex flex-column align-content-center">
                                <p>With holidays<input className="ml-2" type="radio" name="holiday" value="true"/></p>
                                <p>Without holidays<input className="ml-2" type="radio" name="holiday" value="false" checked/></p>
                            </span>
                            <span className="d-flex flex-column">
                                <p>Shift length: <input type="text" onChange={holiday(length)} value={holidayShiftSettings.length}/></p>
                                <p>Number of shifts: <input type="text" onChange={holiday(amount)} value={holidayShiftSettings.amount}/></p>
                                <p>Workers needed: <input type="text" onChange={holiday(workerCount)} value={holidayShiftSettings.workerCount}/></p>
                            </span>
                        </section>
                    </section>
                    <section className="card">
                        <section className="card-footer">
                            <button className="btn btn-success">
                                Create
                            </button>
                        </section>
                    </section>
                </div>
            </div>
        );
    }
}

export default BoardCreation;