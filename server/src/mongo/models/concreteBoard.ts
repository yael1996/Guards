import { Document, model, Schema } from "mongoose";

interface ConcreteBoard extends Document {
    metaId: string,
    month: number
}
const schemaConcreteBoard = new Schema<ConcreteBoard>({
    metaId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    month: {
        type: Schema.Types.Number,
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