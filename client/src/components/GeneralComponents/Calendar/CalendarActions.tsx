// import {JSONBoard} from '../../../../server/src/mongo/models/Board';
// @ts-ignore
// import moment from 'moment';
// import axios from "axios";
import App from "../../../App";

export class CalendarActions {
    constructor() {}
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
    }
}
export default CalendarActions;
// export const getUserEvents = () => {
// try {
//     // const response = await axios.get('http://127.0.0.1:3000/board');
//     // console.log(response.data[0]);
//     console.log("hErE!");
//     let tomorrow = moment(new Date()).add(1,"days").toDate();
//     return [
//         {
//             start: new Date(),
//             end: tomorrow,
//             title: "my title",//response.data[0].owner
//         },
//
//     ]
//     // const board = new JSONBoard();
//     // board.owner = response.data[0].owner;
//     // board.isOptimised = response.data[0].isOptimised;
//     // board.workDays = response.data[0].workDays;
//     //
//     // return board
//
// } catch (e) {
//     console.log("Error!!!");
//     console.error(e);
// }
// };

