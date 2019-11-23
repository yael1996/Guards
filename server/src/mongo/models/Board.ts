import { Document, model, Schema } from "mongoose";

interface JSONShift {
    start: Date,
    end: Date,
    neededStaff: Number,
    assignedStaff: [String]
}
interface Shift extends Document {
    start: Schema.Types.Date,
    end: Schema.Types.Date,
    neededStaff: Schema.Types.Number,
    assignedStaff: [Schema.Types.String]
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

interface JSONWorkDay {
    shifts: [Shift]
}
interface WorkDay extends Document {
    shifts: [Shift]
}
const schemaWorkDay = new Schema<WorkDay>({
    shifts: {
        type: [schemaShift],
        required: true
    }
});

interface JSONBoard {
    owner: String,
    isOptimised: Boolean,
    workDays: [WorkDay]
}
interface Board extends Document {
    owner: Schema.Types.String,
    isOptimised: Schema.Types.Boolean,
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

schemaBoard.pre("save", (next) => {
    // Next with Error object should break the chain
})

const register = () => model<Board>("boards", schemaBoard);

export { register, JSONBoard, Board, JSONWorkDay, WorkDay, JSONShift, Shift };