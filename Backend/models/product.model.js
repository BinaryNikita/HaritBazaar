import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    image: [{ type: String }],
    carbonFootprint: {type: mongoose.Schema.Types.Double, default:0.0},
    isOrganic: { type: Boolean, default: false },
    isRecycled: { type: Boolean, default: false },
    type: { type: String, enum: ['Eco-Friendly', 'Reusable', 'Biodegradable'] },
    quantity: { type: Number },
    buyCount: {type: Number, default: 0},
    viewCount: {type: Number, default: 0},
    discount: {type: mongoose.Schema.Types.Double, default:0.0},
    isActive: { type: Boolean, default: true }
});

export const Product = mongoose.model('Product', ProductSchema);
