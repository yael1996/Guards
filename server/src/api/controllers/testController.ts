import { Router } from "express";
import { TestAlgo } from "../../utiles/test/TestAlgo";
import { Month } from "../../mongo/models/concreteBoard";
import { USER_TYPE } from "../../utiles/userTypeEnum";

const router = Router();
const algorithem = new TestAlgo();

router.get("/best", async (req, res) => {
  try {
    const boardId = "5ded3d8f2c0fad49d4feae94";
    const month: Month = { year: 2019, month: 9 };
    //const result = await algorithem.getbest(boardId, month, 0.1, 0.1, 0.8);
    const result = await algorithem.test(boardId, month);
    res.status(201).end(JSON.stringify(result));
  } catch (error) {
    res.status(406).end(JSON.stringify({ error: error.message }));
  }
});

router.get("/create", async (req, res) => {
  try {
    const month: Month = { year: 2019, month: 10 };
    const manager = await algorithem.createUser("yael", USER_TYPE.MANAGER);
    const board = await algorithem.createBoard("yaelsBoard", manager.id);
    await algorithem.createWorkersForBoard(board.id, 10);
    await algorithem.addRandomUsersConstraints(board.id, month, 3);
    res.status(406).end(JSON.stringify("done!"));
  } catch (error) {
    res.status(406).end(JSON.stringify({ error: error.message }));
  }
});

export { router };
