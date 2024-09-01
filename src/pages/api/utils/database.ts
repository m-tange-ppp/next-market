import mongoose from "mongoose";

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.DB_URL as string);
        console.log("Success: Connected to MongoDB");
    } catch (error) {
        console.log("Failure: Unconnected to MongoDB");
        throw new Error("");
    }
}