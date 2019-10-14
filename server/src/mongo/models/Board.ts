import { Document, model, Schema } from "mongoose";

interface DateTime {
    date: string,
    time: string
}
const schemaDateTime = new Schema<DateTime>({
    date: String,
    time: String
})

interface Shift {
    start: DateTime,
    end: DateTime
}
const schemaShift = new Schema<Shift>({
    start: schemaDateTime,
    end: schemaDateTime
})

interface WorkDay {
    shifts: Shift[]
}
const schemaWorkDay = new Schema<WorkDay>({
    shifts: [schemaShift]
})

interface Board extends Document {
    owner: string,
    workDays: WorkDay[]
}
const schemaBoard = new Schema<Board>({
    owner: String,
    workDays: [schemaWorkDay]
})

const boardModel = model<Board>("boards", schemaBoard)
export {boardModel, Board, WorkDay, Shift, DateTime}