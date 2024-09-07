import connectDB from "../utils/database";
import { UserModel } from "../utils/schemaModels";
import type { NextApiResponse } from "next";
import { ResMessageType, ExtendedNextApiRequestUser } from "../utils/types";

export default async function registerUser(req: ExtendedNextApiRequestUser, res: NextApiResponse<ResMessageType>) {
    // preflight requestに対するokレスポンス
    if (req.method === "OPTIONS") {
        return res.status(204).end();
    }

    try {
        await connectDB();
        await UserModel.create(req.body);
        return res.status(200).json({ message: "ユーザー登録成功" });
    } catch (error) {
        return res.status(400).json({ message: "ユーザー登録失敗" });
    }
}