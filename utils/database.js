import mongoose from "mongoose";

export default function mongoose() {
    try {
        mongoose.connect("");
        console.log("Success: Connected to MongoDB");
    } catch (error) {

    }
}