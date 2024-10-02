import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
    docNumber: {
        type: Number,
        required: [true, "Please add doc number"],
        default: () => {
            let max = 0;
            Inventory.find().sort({ docNumber: -1 }).limit(1).then(doc => {
                if (doc.length) {
                    max = doc[0].docNumber;
                }
            });
            return max + 1;
        }
        },
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Items',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    salesOrder: {
        type: string,
        required: true
    },
    initalBalance: { // befor transaction
        type: Number,
        required: true
    },
    currentBalance: { // after transaction
        type: Number,
        required: true
    },
    paymentDetail: { //check number or transfer number
        type: string,
    },
    deliveryDetail: {  // GRN number
        type: string,
    },
    transactionType: { // paid or free
        type: string,
        enum: ["paid", "free"],
    }
    
    
},
{timestamps: true}
)

export default mongoose.models.Inventory || mongoose.model("Inventory", inventorySchema)