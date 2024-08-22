import connectDB from "@/pages/utils/database"
import { ItemModel } from "@/pages/utils/schemaModel";

export default async function createItem(req, res) {
    try {
        await connectDB();
        await ItemModel.create(req.body);
        return res.status(200).json({ message: "アイテム作成成功" });
    } catch (error) {
        return res.status(400).json({ message: "アイテム作成失敗" })
    }
}
