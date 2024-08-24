import connectDB from "@/utils/database";
import { ItemModel } from "@/utils/schemaModel";

export default async function getSingleItem(req, res) {
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(req.query.id);
        return res.status(200).json({ message: "アイテムをひとつ読み取り成功", singleItem: singleItem });
    } catch (error) {
        return res.status(400).json({ message: "アイテムをひとつ読み取り失敗" });
    }
}