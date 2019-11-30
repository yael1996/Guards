// import {JSONBoard} from '../../../../server/src/mongo/models/Board';
// @ts-ignore
// import moment from 'moment';
import axios from "axios";
import App from "../../../App";
import {JSONBoard, JSONShift, Shift, Shift, WorkDay} from "../../../../../server/src/mongo/models/Board";
// import moment = require("moment");

export class CalendarActions {
    constructor() {
    }

    myFunc = () => {
        const tomorrow = new Date(new Date());

        tomorrow.setDate(tomorrow.getDate() + 1);
        return [
            {
                start: new Date(),
                end: tomorrow,
                title: "my title"
            },
        ];
    };

    getUserEvents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3000/board');

            const tomorrow = new Date(new Date());

            tomorrow.setDate(tomorrow.getDate() + 1);

            // return [
            //     {
            //         start: new Date(),
            //         end: tomorrow,
            //         title: "GWEE title",//response.data[0].owner
            //     },
            //
            // ]
            const days: WorkDay[];
            const myShifts: Shift[];

            const board: JSONBoard = {
                owner: "a",
                isOptimised: true,
                workDays: days
            };

        } catch (e) {
            console.log("Error!!!");
            console.error(e);
        }
    };
}
export default CalendarActions;


