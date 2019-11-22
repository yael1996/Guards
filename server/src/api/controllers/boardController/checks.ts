import { Board } from "../../../mongo/models/board";
import { compose } from "../../../utiles/composeError";

const noEmptyWorkDays = (board: Board) => {
    if (board.workDays.length === 0) {
        return new Error("Cannot declare a calendar without any work days");
    }
}

const checks = compose(noEmptyWorkDays);

export { checks };