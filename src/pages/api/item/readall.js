import connectDB from "@/pages/utils/database";
import { ItemModel } from "@/pages/utils/schemaModel";

export default async function getAllItems(req, res) {
    try {
        await connectDB();
        const allItems = await ItemModel.find();
        return res.status(200).json({ message: "アイテムをすべて読み取り成功", allItems: allItems });
    } catch (error) {
        return res.status(400).json({ message: "アイテムをすべて読み取り失敗" });
    }
}