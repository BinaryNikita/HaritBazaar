import mongoose from "mongoose";

const DeadProductsSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    productImage: { type: String },
    actionType: { type: String, enum: ['Donate', 'Recycle'], required: true },
    productCondition: { type: String, enum: ['Dead', 'Reusable'], required: true },
    actionDate: { type: Date, default: Date.now },
    status: { type: String, enum: ['Completed', 'Pending'], required: true }
});

export const DeadProduct = mongoose.model('DeadProduct', DeadProductsSchema);
