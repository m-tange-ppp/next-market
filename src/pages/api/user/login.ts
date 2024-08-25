import connectDB from "../../../utils/database";
import { UserModel } from "../../../utils/schemaModels";
import jwt from "jsonwebtoken";
import type { NextApiResponse } from "next";
import { ResMessageType, ExtendedNextApiRequestUser, SavedUserDataType } from "../../../utils/types";

export default async function loginUser(req: ExtendedNextApiRequestUser, res: NextApiResponse<ResMessageType>) {
    try {
        await connectDB();
        const savedUserData: SavedUserDataType | null = await UserModel.findOne({ email: req.body.email });
        if (savedUserData) {
            if (savedUserData.password === req.body.password) {
                const payload = {
                    email: req.body.email,
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "23h" });
                return res.status(200).json({ message: "ログイン成功", token: token });
            } else {
                return res.status(400).json({ message: "ログイン失敗 : パスワードを確認してください" });
            }
        } else {
            return res.status(400).json({ message: "ログイン失敗 : ユーザー登録をしてください" });
        }
    } catch (error) {
        return res.status(400).json({ message: "ログイン失敗" });
    }
}