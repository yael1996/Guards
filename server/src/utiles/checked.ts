import { Response, Request } from "express";

const checked = (
    checkFn: (x: any) => any,
    fn: (req: Request, res: Response) => Promise<any>) => async (req: Request, res: Response) => {
    
    const checkResult = checkFn(req.body);
    if (checkResult instanceof Error) {
        throw checkResult;
    }
    fn(req, res);
}

export { checked };