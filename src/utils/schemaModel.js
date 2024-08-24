import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
    title: String,
    image: String,
    prigce: String,
    description: String,
    email: String,
});

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

export const ItemModel = mongoose.models.Item || mongoose.model("Item", ItemSchema);

export const UserModel = mongoose.models.User || mongoose.model("User", UserSchema);