import connectDB from "@/utils/database";
import { UserModel } from "@/utils/schemaModel";

export default async function registerUser(req, res) {
    try {
        await connectDB();
        await UserModel.create(req.body);
        return res.status(200).json({ message: "ユーザー登録成功" });
    } catch (error) {
        return res.status(400).json({ message: "ユーザー登録失敗" });
    }
}