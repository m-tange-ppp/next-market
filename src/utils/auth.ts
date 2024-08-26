import jwt from "jsonwebtoken";
import type { NextApiResponse } from "next";
import { DecodedType, ExtendedNextApiRequestAuth, ResMessageType } from "./types";

export default function auth(handler: Function) {
    return async (req: ExtendedNextApiRequestAuth, res: NextApiResponse<ResMessageType>) => {
        if (req.method === "GET") {
            return handler(req, res);
        } else {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhvZ2VAaG9nZWhvZ2UuY29tIiwiaWF0IjoxNzI0NjgyOTcxLCJleHAiOjE3MjQ3NjU3NzF9.veI8XhjLExVymLfIPIdcqJSXGsblMXUDZrlu-F2TTeM"
            // await req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "トークンがありません" });
            } else {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
                    req.body.email = (decoded as DecodedType).email;
                    return handler(req, res);
                } catch (error) {
                    return res.status(401).json({ message: "トークンがただしくないので、ログインしてください" });
                }
            }
        }
    };
}