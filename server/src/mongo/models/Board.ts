import { Document, model, Schema, HookSyncCallback } from "mongoose";

interface Time {
  hour: number;
  minute: number;
}
const schemaTime = new Schema<Time>({
  hour: {
    type: Schema.Types.Number,
    required: true
  },
  minute: {
    type: Schema.Types.Number,
    required: true
  }
});

interface ShiftSettings {
  numWorkersInShift: number;
  shiftLengthInHours: number;
}
const schemaShiftSettings = new Schema<ShiftSettings>({
  numWorkersInShift: {
    type: Schema.Types.Number,
    required: true
  },
  shiftLengthInHours: {
    type: Schema.Types.Number,
    required: true
  }
});

interface DaySettings {
  numShiftsInDay: number;
  startHour: Time;
}
const schemaDaySettings = new Schema<DaySettings>({
  numShiftsInDay: {
    type: Schema.Types.Number,
    required: true
  },
  startHour: {
    type: schemaTime,
    required: true
  }
});

interface IndexSettings {
  days: number[];
  daySettings: DaySettings;
  shiftSettings: ShiftSettings;
}
const schemaIndexSettings = new Schema<IndexSettings>({
  days: {
    type: [Schema.Types.Number],
    required: true
  },
  daySettings: {
    type: schemaDaySettings,
    required: true
  },
  shiftSettings: {
    type: schemaShiftSettings,
    required: true
  }
});

interface DateSettings {
  dates?: Date[];
  daySettings: DaySettings;
  shiftSettings: ShiftSettings;
}
const schemaDateSettings = new Schema<DateSettings>({
  dates: {
    type: [Schema.Types.Date],
    required: false
  },
  daySettings: {
    type: schemaDaySettings,
    required: true
  },
  shiftSettings: {
    type: schemaShiftSettings,
    required: true
  }
});

interface BoardSettings {
  regularDaySettings: IndexSettings;
  specialDaysSettings: IndexSettings;
  specialDatesSettings: DateSettings;
}
const schemaBoardSettings = new Schema<BoardSettings>({
  regularDaySettings: {
    type: schemaIndexSettings,
    required: true
  },
  specialDaysSettings: {
    type: schemaIndexSettings,
    required: false
  },
  specialDatesSettings: {
    type: schemaDateSettings,
    required: false
  }
});

interface BoardModel {
  name: string;
  description: string;
  ownerId: string;
  boardSettings: BoardSettings;
  workerIds: string[];
}

interface JSONBoard extends BoardModel {
  id?: string;
}
interface Board extends BoardModel, Document {}
const schemaBoard = new Schema<Board>({
  name: {
    type: Schema.Types.String,
    required: true
  },
  description: {
    type: Schema.Types.String,
    required: true
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  boardSettings: {
    type: schemaBoardSettings,
    required: true
  },
  workerIds: {
    type: [Schema.Types.ObjectId],
    required: false,
    default: []
  }
});

schemaBoard.pre("save", function(this: Board, next) {
  next();
});

const register = () => model<Board>("boards", schemaBoard);

export {
  register,
  Board,
  JSONBoard,
  BoardSettings,
  DateSettings,
  IndexSettings,
  DaySettings,
  ShiftSettings,
  Time
};
