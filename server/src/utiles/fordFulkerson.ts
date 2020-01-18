import { FlowNetwork, FordFulkerson, FlowEdge } from "js-graph-algorithms";
import { Shift } from "../mongo/models/concreteBoard";
import { ShiftSettings } from "../mongo/models/board";
import { SHIFT_TYPE } from "./shiftTypeEnum";
import { Constraint } from "../mongo/models/User";

const shiftWorkers = (shifts: Shift[]): string[] => {
  return shifts.reduce((base: string[], { workersId }) => {
    workersId.forEach(x => {
      base.push(x);
    });
    return base;
  }, []);
};

// nlogn instead of n^2 so no reason not to use it
const deleteAdjacentDuplicates = (workers: string[]): string[] => {
  return workers
    .sort((left, right) => left.localeCompare(right))
    .filter((workerId, index) => {
      if (index === 0) {
        return true;
      } else {
        return workers[index - 1] !== workerId;
      }
    });
};

const indexWorkers = (shifts: Shift[]): {} => {
  const workers = deleteAdjacentDuplicates(shiftWorkers(shifts));

  // Return a map of [workerId -> index] so access will be fast
  return workers.reduce((base, worker, index) => {
    base[worker] = index;
    return base;
  }, {});
};

/**
 * Generate a tuple whose 1st element is a function that calculates ford-fulkerson
 * on the given dataset and the 2nd element is the needed maximal flow.
 * @example result[0]().value === result[1] // Checks if achieved maximal flow
 * @param shifts Shifts to work with
 * @param regularShiftSettings The settings of the regular shifts
 * @param specialShiftSettings The settings of the special shifts
 * @param specialDaySettings The settings of the special days
 */
const createGraph = (
  shifts: Shift[],
  regularShiftSettings: ShiftSettings,
  specialShiftSettings: ShiftSettings,
  specialDaySettings: ShiftSettings,
  workersConstraints: { [id: string]: Constraint[] }
): [() => FordFulkerson, number] => {
  const workers = indexWorkers(shifts);
  const source = 0;
  const workersBaseIndex = 1;
  const numOfWorkers = Object.getOwnPropertyNames(workers).length;
  const shiftBaseIndex = workersBaseIndex + numOfWorkers;
  const target = shiftBaseIndex + shifts.length;
  const graphSize = target + 1;
  const shiftsPerWorker = Math.ceil(shifts.length / numOfWorkers);
  const graph = new FlowNetwork(graphSize);

  // Connect the shift edges to target edge
  shifts.forEach(({ shiftType }, index) => {
    let neededWorkers;
    switch (shiftType) {
      case SHIFT_TYPE.REGULAR_DAY:
        neededWorkers = regularShiftSettings.numWorkersInShift;
        break;
      case SHIFT_TYPE.SPECIAL_DATE:
        neededWorkers = specialShiftSettings.numWorkersInShift;
        break;
      case SHIFT_TYPE.SPECIAL_DAY:
        neededWorkers = specialDaySettings.numWorkersInShift;
        break;
    }
    neededMaxFlow += neededWorkers;
    graph.addEdge(new FlowEdge(shiftBaseIndex + index, target, neededWorkers));
  });

  // Connect source edge to worker edges
  for (let i = 0; i < numOfWorkers; i++) {
    graph.addEdge(new FlowEdge(source, workersBaseIndex + i, shiftsPerWorker));
  }

  let neededMaxFlow = 0;
  shifts.forEach((shift, index) => {
    const constraintExists = (workerId: string, shift: Shift) => {
      const workerConstraints = workersConstraints[workerId];
      const { fromTime: shiftFrom, toTime: shiftTo } = shift.shiftTime;
      return workerConstraints.some(({ time: { fromTime, toTime } }) => {
        return (fromTime.getTime() === shiftFrom.getTime() &&
                toTime.getTime() === shiftFrom.getTime());
      })
    }
    shift.workersId.forEach(workerId => {
      if (constraintExists(workerId, shift)) return;
      const workerIndex = workersBaseIndex + workers[workerId];
      graph.addEdge(new FlowEdge(shiftBaseIndex + index, workerIndex, 1));
    });
  });

  return [() => new FordFulkerson(graph, source, target), neededMaxFlow];
};

export { createGraph };
