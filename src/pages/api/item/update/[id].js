import connectDB from "@/pages/utils/database";
import { ItemModel } from "@/pages/utils/schemaModel";
import auth from "../../user/auth";

async function updateItem(req, res) {
    try {
        await connectDB();
        const singleItem = await ItemModel.findById(req.query.id);
        if (singleItem.email === req.body.email) {
            await ItemModel.updateOne({ _id: req.query.id }, req.body);
            return res.status(200).json({ message: "アイテム編集成功" });
        } else {
            throw new Error();
        }
    } catch (error) {
        return res.status(400).json({ message: "アイテム編集失敗" });
    }
}
export default auth(updateItem);