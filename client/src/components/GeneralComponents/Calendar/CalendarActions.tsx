import axios from "axios";
import config from '../../../../src/config/guards'
import {JSONBoard, JSONShift, WorkDay} from "../../../../../server/src/mongo/models/Board";

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
            //TODO: grab relevant board by user ID
            const response = await axios.get(config.url+ '/board');
            const boardData : JSONBoard = response.data[0];
            let events = [];

            for (let workDay of boardData.workDays){
                for (let shift of workDay.shifts){
                    events.push(
                        {
                            start: shift.start,
                            end: shift.end,
                            title: shift.assignedStaff //TODO: fix this
                        }
                    )
                }
            }
            // const tomorrow = new Date(new Date());
            // tomorrow.setDate(tomorrow.getDate() + 5);


            return [
                {
                    start: new Date(),
                    end: new Date(),
                    title: boardData.owner,
                }
                ];

        } catch (e) {
            console.log("Error!!!");
            console.error(e);
            return e
        }

    };
}
export default CalendarActions;


