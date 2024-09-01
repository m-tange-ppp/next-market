import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { DecodedType } from "./types";


async function validateToken(req:NextApiRequest, res:NextApiResponse) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({message: "トークンがありません"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        return res.status(200).json({email: (decoded as DecodedType).email});
    } catch (error) {
        return res.status(401).json({message: "トークンを検証できません"});
    }
}

export default validateToken;