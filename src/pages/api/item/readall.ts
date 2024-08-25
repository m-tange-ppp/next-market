import connectDB from "../../../utils/database";
import { ItemModel } from "../../../utils/schemaModels";
import type { NextApiRequest, NextApiResponse } from "next";
import { ResReadAllType, SavedItemDataType } from "../../../utils/types";


export default async function getAllItems(req: NextApiRequest, res: NextApiResponse<ResReadAllType>) {
    try {
        await connectDB();
        const allItems: SavedItemDataType[] = await ItemModel.find();
        return res.status(200).json({ message: "アイテムをすべて読み取り成功", allItems: allItems });
    } catch (error) {
        return res.status(400).json({ message: "アイテムをすべて読み取り失敗" });
    }
}