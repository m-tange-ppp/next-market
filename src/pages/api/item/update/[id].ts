import connectDB from "../../utils/database";
import { ItemModel } from "../../utils/schemaModels";
import auth from "../../utils/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { SavedItemDataType, ExtendedNextApiRequestItem, ResMessageType } from "../../utils/types";

async function updateItem(req: ExtendedNextApiRequestItem, res: NextApiResponse<ResMessageType>) {
    try {
        await connectDB();
        const singleItem: SavedItemDataType | null = await ItemModel.findById(req.query.id);
        if (!singleItem) {
            return res.status(400).json({ message: "アイテム編集失敗 : アイテムが存在しません" });
        } else {
            if (singleItem.email === req.body.email) {
                await ItemModel.updateOne({ _id: req.query.id }, req.body);
                return res.status(200).json({ message: "アイテム編集成功" });
            } else {
                throw new Error("");
            }

        }
    } catch (error) {
        return res.status(400).json({ message: "アイテム編集失敗" });
    }
}
export default auth(updateItem);