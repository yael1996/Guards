import { Document, model, Schema } from "mongoose";
import { SHIFT_TYPE } from "../../utiles/shiftTypeEnum";

interface Month {
  month: number;
  year: number;
}
const schemaMonth = new Schema<Month>({
  month: {
    type: Schema.Types.Number,
    required: true
  },
  year: {
    type: Schema.Types.Number,
    required: true
  }
});

interface ShiftTime {
  month: Month;
  fromTime: Date;
  toTime: Date;
}
const schemaShiftTime = new Schema<ShiftTime>({
  month: {
    type: schemaMonth,
    required: true
  },
  fromTime: {
    type: Schema.Types.Date,
    required: true
  },
  toTime: {
    type: Schema.Types.Date,
    required: true
  }
});
interface Shift {
  shiftTime: ShiftTime;
  shiftType: SHIFT_TYPE;
  workersId: string[];
}
const schemaShift = new Schema<Shift>({
  shiftTime: {
    type: schemaShiftTime,
    required: true
  },
  shiftType: {
    type: Schema.Types.Number,
    enum: [
      SHIFT_TYPE.REGULAR_DAY,
      SHIFT_TYPE.SPECIAL_DATE,
      SHIFT_TYPE.SPECIAL_DATE
    ],
    required: true
  },
  workersId: {
    type: [Schema.Types.ObjectId],
    required: true
  }
});

interface JSONConcreteBoard {
  metaId: string;
  month: Month;
  shifts: Shift[];
}
interface ConcreteBoard extends JSONConcreteBoard, Document {}
const schemaConcreteBoard = new Schema<ConcreteBoard>({
  metaId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  month: {
    type: schemaMonth,
    required: true
  },
  shifts: {
    type: [schemaShift],
    required: true
  }
});

schemaConcreteBoard.pre("save", function(this: ConcreteBoard, next) {
  if (!(this.month.month >= 0 && this.month.month <= 12)) {
    next(new Error("Month is invalid!"));
  } else {
    next();
  }
});

const register = () =>
  model<ConcreteBoard>("concreteBoards", schemaConcreteBoard);

export {
  register,
  ConcreteBoard,
  JSONConcreteBoard,
  Month,
  Shift,
  schemaMonth,
  ShiftTime
};
