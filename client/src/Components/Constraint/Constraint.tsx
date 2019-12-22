import {History, Location} from "history";
import React, { Component } from "react";
import {
    Tooltip,
    withTooltip,
} from 'react-tippy';
import {CompanyState} from "../../Store/Company/types";
import CompanyComp from "../Company/Company";

interface OwnProps {
    // history: History<any>,
    someText: string
}

interface ReduxProps {
    // companies: CompanyState
}



const tooltipContent = () => (
    <h2>whats up</h2>
);

let tooltipContent2 =  (
    "A"
);

type Props = OwnProps & ReduxProps;



const Header = (someText:string) => (
    <h2>{someText}</h2>
);


class ConstraintComp extends Component<Props, any> {

    constructor(props: Props | undefined) {
        super(props);
        this.changeClicker = this.changeClicker.bind(this);
        this.setIsOpen = this.setIsOpen.bind(this);

        this.state = {
            isOpen : false,
            fromTime : "",
            toTime : "",
        }
    }

    aa = {
        some:"a"
    };

    changeClicker() {
        this.setState({isOpen: false});
        console.log("adfas");
    }

    setIsOpen(val:boolean){
        this.setState({isOpen: val})
    }



    render() {
        const {changeClicker} = this;
        const {setIsOpen} = this;
        const {isOpen, fromTime, toTime} = this.state;

        let aa : string;

        const some1 = this.props.someText;

        return (
            <Tooltip
                interactiveBorder={5}
                trigger="click"
                interactive
                theme = {"dark"}
                open={isOpen}
                onRequestClose={() => {console.log('call'); setIsOpen(false); this.setState({fromTime: "", toTime: ""})}}
                style={{ borderRadius: 4,     borderWidth: 0.5,     borderColor: '#292b29',}}
                html={(
                    <form>
                        <p>{tooltipContent}</p>
                            <div className={"form-group"}>
                                <label>From Time  </label>
                                <input
                                    type="text"
                                    onKeyDown={(e) => {if (e.key === 'Enter'){changeClicker()}}}
                                    onChange ={(e) => this.setState({fromTime: e.target.value})}
                                    value = {fromTime}
                                    className={"form-control"}
                                />
                            </div>
                            <div className={"form-group"}>
                                <label>To Time:</label>
                                <input
                                    type="text"
                                    onKeyDown={(e) => {if (e.key === 'Enter'){changeClicker()}}}
                                    onChange ={(e) => this.setState({toTime: e.target.value})}
                                    value = {toTime}
                                    className={"form-control"}

                                />
                            </div>
                            <button className="btn btn-primary" onClick={changeClicker}> Submit</button>
                        </form>

                )}
            >
                <span className="App-intro" onClick={() => { setIsOpen(true) }}>
    ClickME  {tooltipContent}
  </span>
            </Tooltip>
        )
    }
}

export default ConstraintComp;



