import connectDB from "@/utils/database";
import { UserModel } from "@/utils/schemaModel";
import jwt from "jsonwebtoken";

export default async function loginUser(req, res) {
    try {
        await connectDB();
        const savedUserData = await UserModel.findOne({ email: req.body.email });
        if (savedUserData) {
            if (savedUserData.password === req.body.password) {
                const payload = {
                    email: req.body.email,
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "23h" });
                return res.status(200).json({ message: "ログイン成功" });
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