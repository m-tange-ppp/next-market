import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    title: String,
    image: String,
    prigce: String,
    description: String,
    email: String,
});

export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema);