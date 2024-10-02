import mongoose from "mongoose";

const connect = async () => {
    if (mongoose.connections[0].readyState) return;

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to mongodb");
    } catch (error) {
        throw new Error("Error connecting to mongodb");
    }
};

export default connect;
