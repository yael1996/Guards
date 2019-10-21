import { Response, Request } from "express";

const safeAsync = (fn: (req: Request, res: Response) => Promise<any>) => async (req: Request, res: Response) => {
    try {
        const result = await fn(req, res);
        res.status(200).end(result);
    } catch (error) {
        res.status(500).end(error);
    }
};

export { safeAsync };