import { Document, model, Schema } from "mongoose";

interface Shift {
    start: Date,
    end: Date,
    neededStaff: Number,
    assignedStaff: [String]
}

const schemaShift = new Schema<Shift>({
    start: {
        type: Schema.Types.Date,
        required: true
    },
    end: {
        type: Schema.Types.Date,
        required: true
    },
    neededStaff: {
        type: Schema.Types.Number,
        required: true
    },
    assignedStaff: {
        type: [Schema.Types.ObjectId]
    }
});

interface WorkDay {
    shifts: [Shift]
}
const schemaWorkDay = new Schema<WorkDay>({
    shifts: {
        type: [schemaShift],
        required: true
    }
});

interface Board extends Document {
    owner: String,
    isOptimised: Boolean,
    workDays: [WorkDay]
}
const schemaBoard = new Schema<Board>({
    owner: {
        type: Schema.Types.ObjectId,
        required: true
    },
    isOptimised: {
        type: Schema.Types.Boolean,
        default: false
    },
    workDays: {
        type: [schemaWorkDay],
        required: true
    }
});

const register = () => model<Board>("boards", schemaBoard);

export { register, Board, WorkDay, Shift };