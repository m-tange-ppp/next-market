import connectDB from "@/utils/database"
import { ItemModel } from "@/utils/schemaModel";
import auth from "../../../utils/auth";

async function createItem(req, res) {
    try {
        await connectDB();
        await ItemModel.create(req.body);
        return res.status(200).json({ message: "アイテム作成成功" });
    } catch (error) {
        return res.status(400).json({ message: "アイテム作成失敗" })
    }
}
export default auth(createItem);