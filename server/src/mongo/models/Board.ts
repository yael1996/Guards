import { Document, model, Schema } from "mongoose";

interface Time {
    hour: number,
    minute: number
}
const schemaTime = new Schema<Time>({
    hour: Schema.Types.Number,
    minutes: Schema.Types.Number
})

interface ShiftSettings {
    numWorkersInShift: number,
    shiftLengthInHours: number
}
const schemaShiftSettings = new Schema<ShiftSettings>({
    numWorkersInShift: Schema.Types.Number,
    shiftLengthInHours: Schema.Types.Number
})

interface DaySettings {
    numShiftsInDay: number,
    startHour: Time
}
const schemaDaySettings = new Schema<DaySettings>({
    numShiftsInDay: Schema.Types.Number,
    startHour: schemaTime
})

interface RegularDaySettings {
    days: number[],
    daySettings: DaySettings,
    shiftSettings: ShiftSettings
}
const schemaRegularDaySettings = new Schema<RegularDaySettings>({
    days: [Schema.Types.Number],
    daySettings: schemaDaySettings,
    shiftSettings: schemaShiftSettings
})

interface SpecialDaysSettings {
    days: number[],
    daySettings: DaySettings,
    shiftSettings: ShiftSettings
}
const schemaSpecialDaysSettings = new Schema<SpecialDaysSettings>({
    days: [Schema.Types.Number],
    daySettings: schemaDaySettings,
    shiftSettings: schemaShiftSettings
})

interface SpecialDatesSettings {
    dates: Date[],
    daySettings: DaySettings,
    shiftSettings: ShiftSettings
}
const schemaSpecialDatesSettings = new Schema<SpecialDatesSettings>({
    dates: [Schema.Types.Date],
    daySettings: schemaDaySettings,
    shiftSettings: schemaShiftSettings
})

interface BoardSettings {
    regularDaySettings: RegularDaySettings,
    specialDaysSettings: SpecialDaysSettings,
}
const schemaBoardSettings = new Schema<BoardSettings>({
    regularDaySettings: schemaRegularDaySettings,
    specialDaysSettings: schemaSpecialDaysSettings,
    specialDatesSettings: schemaSpecialDatesSettings
})

interface Board extends Document {
    name: string,
    description: string,
    ownerId: string,
    boardSettings: BoardSettings
}
const schemaBoard = new Schema<Board>({
    name: {
        type: Schema.Types.String,
        required: true
    },
    description: Schema.Types.String,
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    boardSettings: schemaBoardSettings
});

schemaBoard.pre("save", (next) => {
    // Next with Error object should break the chain
})

const register = () => model<Board>("boards", schemaBoard);

export { register, Board, BoardSettings, SpecialDaysSettings, RegularDaySettings, DaySettings, ShiftSettings, Time };