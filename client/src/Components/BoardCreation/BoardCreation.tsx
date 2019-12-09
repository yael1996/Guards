import React, { Component } from "react";
import { DayMap, ShiftSettings, CreationState, Company } from "../../Store/Company/types";
import { History } from "history";
import { RootState, AppDispatch } from "../../Store/store";
import { connect } from "react-redux";
import { UserState } from "../../Store/User/types";
import { createCompany } from "../../Store/Company/actions";
import config from "../../config/config";

interface OwnProps {
    history: History<any>
}

interface ReduxProps {
    user: UserState
}

interface ReduxDispatch {
    create: (creationState: Company, withHolidays: boolean) => Promise<Company>
}

type Props = OwnProps & ReduxProps & ReduxDispatch;

type ShiftUpdate = (settings: ShiftSettings, e: React.ChangeEvent<HTMLInputElement>) => ShiftSettings;

class BoardCreation extends Component<Props, CreationState> {
    constructor(props: any | undefined) {
        super(props);
        this.state = {
            name: "",
            description: "",
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
        this.onCreate = this.onCreate.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.withHolidays = this.withHolidays.bind(this);
    }

    markDay(type: string, contrastsWith: DayMap[]) {
        return (ordinal: number) => () => {
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

                let newState: CreationState;
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
        return function (e: React.ChangeEvent<HTMLInputElement>) {
            const settings = fn(that.state.standardShiftSettings, e);
            const newState = Object.assign({}, that.state, { standardShiftSettings: settings });
            that.setState(newState);
        }
    }

    updateSpecialSettings(fn: ShiftUpdate) {
        const that = this;
        return function (e: React.ChangeEvent<HTMLInputElement>) {
            const settings = fn(that.state.specialShiftSettings, e);
            that.setState(Object.assign({}, that.state, { specialShiftSettings: settings }));
        }
    }

    updateHolidaySettings(fn: ShiftUpdate) {
        const that = this;
        return function (e: React.ChangeEvent<HTMLInputElement>) {
            const settings = fn(that.state.holidayShiftSettings, e);
            that.setState(Object.assign({}, that.state, { holidayShiftSettings: settings }));
        }
    }

    allowOnlyNumbers(fn: (e: React.ChangeEvent<HTMLInputElement>) => void) {
        return function (e: React.ChangeEvent<HTMLInputElement>) {
            if (+e.target.value || e.target.value === "") {
                fn(e);
            }
        }
    }

    onCreate() {
        const toDaysArray = (days: DayMap): number[] => {
            return days.reduce((base, val, index) => {
                if (val) {
                    base.push(index);
                }
                return base;
            }, [] as number[]);
        };

        const { _id: ownerId } = this.props.user;
        const { name, description, standardDays, specialDays, withHolidays } = this.state;
        const { amount: stdAmount, length: stdLength, workerCount: stdWorkerCount } = this.state.standardShiftSettings;
        const { amount: spcAmount, length: spcLength, workerCount: spcWorkerCount } = this.state.specialShiftSettings;
        const { amount: hdAmount, length: hdLength, workerCount: hdWorkerCount } = this.state.holidayShiftSettings;

        const company: Company = {
            name,
            description,
            ownerId,
            workerIds: [] as string[],
            boardSettings: {
                regularDaySettings: {
                    days: toDaysArray(standardDays),
                    daySettings: {
                        numShiftsInDay: parseInt(stdAmount),
                        startHour: { hour: 1, minute: 1 }
                    },
                    shiftSettings: {
                        numWorkersInShift: parseInt(stdWorkerCount),
                        shiftLengthInHours: parseInt(stdLength)
                    }
                },
                specialDaysSettings: {
                    days: toDaysArray(specialDays),
                    daySettings: {
                        numShiftsInDay: parseInt(spcAmount),
                        startHour: { hour: 1, minute: 1 }
                    },
                    shiftSettings: {
                        numWorkersInShift: parseInt(spcWorkerCount),
                        shiftLengthInHours: parseInt(spcLength)
                    }
                },
                specialDatesSettings: {
                    daySettings: {
                        numShiftsInDay: parseInt(hdAmount),
                        startHour: { hour: 1, minute: 1 }
                    },
                    shiftSettings: {
                        numWorkersInShift: parseInt(hdWorkerCount),
                        shiftLengthInHours: parseInt(hdLength)
                    }
                }
            }
        };
        this.props.create(company, withHolidays).then(() => {
            this.props.history.push(`${config.backendUri}/dashboard`);
        });
    }

    onNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: e.target.value
        });
    }

    onDescriptionChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            description: e.target.value
        });
    }

    withHolidays(value: boolean) {
        return () => {
            this.setState({
                withHolidays: value
            });
        }
    }

    render() {
        const { name, description, standardDays, specialDays, withHolidays } = this.state;
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
                            <h4 className="mv-0">General settings</h4>
                        </section>
                        <section className="card-body">
                            <div className="input-group mb-3">
                                <div className="input-group-prepend"><span>Board name:</span></div>
                            </div>
                            <input type="text" onChange={this.onNameChange} value={name} />
                            <div className="input-group mb-3">
                                <div className="input-group-prepend"><span>Board name:</span></div>
                            </div>
                            <input type="text" onChange={this.onDescriptionChange} value={description} />
                        </section>
                        <section className="card-header d-flex">
                            <h4 className="mb-0">Standard days settings</h4>
                        </section>
                        <section className="card-body">
                            <p>Standard days</p>
                            <span className="d-flex justify-content-center mb-5">
                                {standardDays.map((x, index) => {
                                    if (x) {
                                        return <button key={index} onClick={markStandard(index)} className="btn btn-primary mx-1">{index + 1}</button>;
                                    } else {
                                        return <button key={index} onClick={markStandard(index)} className="btn btn-secondary mx-1">{index + 1}</button>;
                                    }
                                })}
                            </span>
                            <span className="d-flex flex-column">
                                <p>Shift length: <input type="text" onChange={standard(length)} value={standardShiftSettings.length} /></p>
                                <p>Number of shifts: <input type="text" onChange={standard(amount)} value={standardShiftSettings.amount} /></p>
                                <p>Workers needed: <input type="text" onChange={standard(workerCount)} value={standardShiftSettings.workerCount} /></p>
                            </span>
                        </section>
                    </section>
                    <section className="card w-75 mb-3">
                        <section className="card-header d-flex">
                            <h4 className="mb-0">Special days settings</h4>
                        </section>
                        <section className="card-body">
                            <p>Special days</p>
                            <span className="d-flex justify-content-center mb-5">
                                {specialDays.map((x, index) => {
                                    if (x) {
                                        return <button key={index} onClick={markSpecial(index)} className="btn btn-primary mx-1">{index + 1}</button>;
                                    } else {
                                        return <button key={index} onClick={markSpecial(index)} className="btn btn-secondary mx-1">{index + 1}</button>;
                                    }
                                })}
                            </span>
                            <span className="d-flex flex-column">
                                <p>Shift length: <input type="text" onChange={special(length)} value={specialShiftSettings.length} /></p>
                                <p>Number of shifts: <input type="text" onChange={special(amount)} value={specialShiftSettings.amount} /></p>
                                <p>Workers needed: <input type="text" onChange={special(workerCount)} value={specialShiftSettings.workerCount} /></p>
                            </span>
                        </section>
                    </section>
                    <section className="card w-75 mb-3">
                        <section className="card-header d-flex">
                            <h4 className="mb-0">Holidays settings</h4>
                        </section>
                        <section className="card-body">
                            <span className="d-flex flex-column align-content-center">
                                <p>With holidays<input className="ml-2" type="radio" name="holiday" value="true" onChange={this.withHolidays(true)} /></p>
                                <p>Without holidays<input className="ml-2" type="radio" name="holiday" value="false" onChange={this.withHolidays(false)} checked /></p>
                            </span>
                            <span className="d-flex flex-column">
                                <p>Shift length: <input type="text" onChange={holiday(length)} value={holidayShiftSettings.length} /></p>
                                <p>Number of shifts: <input type="text" onChange={holiday(amount)} value={holidayShiftSettings.amount} /></p>
                                <p>Workers needed: <input type="text" onChange={holiday(workerCount)} value={holidayShiftSettings.workerCount} /></p>
                            </span>
                        </section>
                    </section>
                    <section className="card">
                        <section className="card-footer">
                            <button className="btn btn-success" onClick={this.onCreate}>
                                Create
                            </button>
                        </section>
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxProps => {
    const { user } = state;
    return {
        user
    };
}

const mapDispatchToProps = (dispatch: AppDispatch): ReduxDispatch => {
    return {
        create: (company: Company, withHolidays: boolean) => dispatch(createCompany(company, withHolidays))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardCreation);