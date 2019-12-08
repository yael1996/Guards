import { Router } from "express";
import { TestAlgo } from "../../utiles/test/TestAlgo";
import { Month } from "../../mongo/models/concreteBoard";

const router = Router();
const algorithem = new TestAlgo();

router.get("/", async (req, res) => {
  try {
    const boardId = "5ded3d8f2c0fad49d4feae94";
    const month: Month = { year: 2019, month: 9 };
    //const boardId = await algorithem.createFullBoard();
    const result = await algorithem.getbest(boardId, month, 0.3, 0.4, 0.3);
    //const result = await algorithem.test(boardId, month);
    res.status(201).end(JSON.stringify(result));
  } catch (error) {
    res.status(406).end(JSON.stringify({ error: error.message }));
  }
});

export { router };
