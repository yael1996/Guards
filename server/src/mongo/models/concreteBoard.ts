import { Document, model, Schema } from "mongoose";
import { Shift } from "../../../../common/objects/shifts/shift";

interface ConcreteBoard extends Document {
    metaId: string,
    month: number,
    shifts: Shift[][]
}
const schemaConcreteBoard = new Schema<ConcreteBoard>({
    metaId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    month: {
        type: Schema.Types.Number,
        required: true
    },
    shifts: {
        type: [[Shift]],
        required: true
    }
});

schemaConcreteBoard.pre("save", function(this: ConcreteBoard, next) {
    if (!(this.month >= 0 && this.month <= 12)) {
        next(new Error("Month is invalid!"));
    } else {
        next();
    }
})

const register = () => model<ConcreteBoard>('concreteBoards', schemaConcreteBoard);

export { register, ConcreteBoard };