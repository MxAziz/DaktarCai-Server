import { NextFunction, Request, Response } from "express";

const validateRequest = (schema: any) => async (req: Request, _res: Response, next: NextFunction)=>{
    try {
        await schema.parseAsync({
            body: req.body,
        })
        return next();

    } catch (err) {
        next(err);
    }
}

export default validateRequest;