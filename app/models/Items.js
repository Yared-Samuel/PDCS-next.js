import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add item name"],
        unique: true
    },
    type: {
        type: String,
        enum: ["beer", "draft", "wine"],
        required: [true,"Please assign type"],
    },
},
{timestamps: true}
);

export default mongoose.models.Items || mongoose.model("Items", itemSchema)