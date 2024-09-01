import jwt from "jsonwebtoken";
import type { NextApiResponse } from "next";
import { DecodedType, ExtendedNextApiRequestAuth, ResMessageType } from "./types";

export default function auth(handler: Function) {
    return async (req: ExtendedNextApiRequestAuth, res: NextApiResponse<ResMessageType>) => {
        if (req.method === "GET") {
            return handler(req, res);
        } else {
            const token = await req.headers.authorization.split(" ")[1];
            if (!token) {
                return res.status(401).json({ message: "トークンがありません" });
            } else {
                try {
                    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
                    req.body.email = (decoded as DecodedType).email;
                    return handler(req, res);
                } catch (error) {
                    return res.status(401).json({ message: "トークンが正しくないので、ログインしてください" });
                }
            }
        }
    };
}