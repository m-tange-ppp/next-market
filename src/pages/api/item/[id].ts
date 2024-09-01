import connectDB from "../utils/database";
import { ItemModel } from "../utils/schemaModels";
import type { NextApiRequest, NextApiResponse } from "next";
import { ResReadSingleType, SavedItemDataType } from "../utils/types";

export default async function getSingleItem(req: NextApiRequest, res: NextApiResponse<ResReadSingleType>) {
    try {
        await connectDB();
        const singleItem: SavedItemDataType | null = await ItemModel.findById(req.query.id);
        if (!singleItem) {
            return res.status(400).json({ message: "アイテムを読み取り失敗 : アイテムが存在しません" });
        } else {
            return res.status(200).json({ message: "アイテムをひとつ読み取り成功", singleItem: singleItem });
        }
    } catch (error) {
        return res.status(400).json({ message: "アイテムをひとつ読み取り失敗" });
    }
}