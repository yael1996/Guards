import { Document, model, Schema } from "mongoose";

interface DateTime {
    date: string,
    time: string
}
const schemaDateTime = new Schema<DateTime>({
    date: Schema.Types.String,
    time: Schema.Types.String
});

interface Shift {
    start: DateTime,
    end: DateTime,
    neededStaff: number,
    assignedStaff: [string]
}
const schemaShift = new Schema<Shift>({
    start: schemaDateTime,
    end: schemaDateTime,
    neededStaff: Schema.Types.Number,
    assignedStaff: [Schema.Types.ObjectId]
});

interface WorkDay {
    shifts: Shift[]
}
const schemaWorkDay = new Schema<WorkDay>({
    shifts: [schemaShift]
});

interface Board extends Document {
    owner: string,
    isOptimised: boolean,
    workDays: WorkDay[]
}
const schemaBoard = new Schema<Board>({
    owner: Schema.Types.ObjectId,
    isOptimised: Schema.Types.Boolean,
    workDays: [schemaWorkDay]
});

const register = () => model<Board>("boards", schemaBoard);

export { register, Board, WorkDay, Shift, DateTime };