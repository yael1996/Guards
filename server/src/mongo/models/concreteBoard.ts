import { Document, model, Schema } from "mongoose";

interface ConcreteBoard extends Document {
    metaId: string,
    generationDate: Date
}
const schemaConcreteBoard = new Schema<ConcreteBoard>({
    metaId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    generationDate: {
        type: Schema.Types.Date,
        required: true
    }
});

const register = () => model<ConcreteBoard>('concreteBoards', schemaConcreteBoard);

export { register, ConcreteBoard };