import mongoose from 'mongoose';
import Items from './Items';

const inventorySchema = new mongoose.Schema({

    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Items,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    salesOrder: {
        type: Number,
        required: true
    },
    paymentDetail: { //check number or transfer number
        type: Number,
        default: null,
    },
    freeOrPaid: { // paid or free
        type: String,
        enum: ["paid", "free"],
    },
    status: { // untouched pending delivered 
        type: String,
        enum: ["remaining", "completed"],
        required: true
    },
    delivery: [
        
        {
            date: {type: Date, required: true},
            quantity: {type: Number, required: true},
            grn: {type: Number, required: true},
            reamining: {type: Number, required: true},
        }
    ]
    
    
    
},
{timestamps: true}
)

export default mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema)