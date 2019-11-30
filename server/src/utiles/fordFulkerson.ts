import { FlowNetwork, FordFulkerson, FlowEdge } from "js-graph-algorithms";
import { Shift } from "../../../common/objects/shifts/shift";
import { ShiftSettings } from "../../../common/objects/settings/shiftSettings";
import { SHIFT_TYPE } from "../../../common/objects/shifts/shiftTypeEnum";

const shiftWorkers = (shifts: Shift[]): string[] => {
    return shifts.reduce((base: string[], { workersIds }) => {
        workersIds.forEach((x) => {
            base.push(x);
        });
        return base;
    }, []);
}

// nlogn instead of n^2 so no reason not to use it
const deleteAdjacentDuplicates = (workers: string[]): string[] => {
    return workers.sort(
            (left, right) => left.localeCompare(right)
        ).filter((workerId, index) => {
            if (index === 0) {
                return true;
            } else {
                return workers[index - 1] !== workerId;
            }
        });
}

const indexWorkers = (shifts: Shift[]): {} => {
    const workers = deleteAdjacentDuplicates(shiftWorkers(shifts));

    // Return a map of [workerId -> index] so access will be fast
    return workers.reduce((base, worker, index) => {
        base[worker] = index;
        return base;
    }, {});
}

const createGraph = (shifts: Shift[],
                    regularShiftSettings: ShiftSettings,
                    specialShiftSettings: ShiftSettings,
                    specialDaySettings: ShiftSettings): FordFulkerson => {
    const workers = indexWorkers(shifts);
    const workersBaseIndex = 1;
    const numOfWorkers = Object.getOwnPropertyNames(workers).length;
    const shiftBaseIndex = workersBaseIndex + numOfWorkers;
    const graphSize = shiftBaseIndex + shifts.length;
    const source = 0;
    const target = graphSize;
    const graph = new FlowNetwork(graphSize);

    // Connect source edge to worker edges
    for (let i = 0; i < numOfWorkers; i++) {
        graph.addEdge(new FlowEdge(source, workersBaseIndex + i, 1));
    }

    // Connect shift edges to worker edges
    shifts.forEach(({ workersIds }, index) => {
        workersIds.forEach((workerId) => {
            const workerIndex = workersBaseIndex + workers[workerId];
            graph.addEdge(new FlowEdge(workerIndex, shiftBaseIndex + index, 1));
        });
    });

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
        graph.addEdge(new FlowEdge(shiftBaseIndex + index, target, neededWorkers));
    });


    return new FordFulkerson(graph, source, target);
}

export { createGraph };