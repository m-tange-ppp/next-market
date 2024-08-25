import connectDB from "../../../utils/database"
import { ItemModel } from "../../../utils/schemaModels";
import auth from "../../../utils/auth";
import type { NextApiResponse } from "next";
import { ExtendedNextApiRequestItem, ResMessageType } from "../../../utils/types";

async function createItem(req: ExtendedNextApiRequestItem, res: NextApiResponse<ResMessageType>) {
    try {
        await connectDB();
        await ItemModel.create(req.body);
        return res.status(200).json({ message: "アイテム作成成功" });
    } catch (error) {
        return res.status(400).json({ message: "アイテム作成失敗" })
    }
}
export default auth(createItem);