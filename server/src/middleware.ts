import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    userId?: string;
}

export const userMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const header = req.headers.authorization;
        if (!header) {
            return res.status(401).send({
                message: "Authorization header is missing!",
            });
        }
        const decoded = jwt.verify(
            header as string,
            process.env.JWT_USER_SECRET as string
        ) as { id: string };

        if(decoded) {
            req.userId = decoded.id;
            next();
        } else {
            return res.status(404).send({
                message: "You are not logged in",
            });
        }
    } catch (error: any) {
        return res.status(404).send({
            message: "Unauthorized!",
            error: error.message
        })
    }
};
