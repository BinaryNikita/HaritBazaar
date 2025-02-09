import mongoose from "mongoose";

const VendorSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    businessName: { type: String, required: true },
    businessEmail: { type: String, unique: true},
    phoneNumber: { type: String, required: true, unique: true },
    businessAddress: { type: String, required: true },
    productCategories: [{ type: String }],
    shippingMethod: { type: String },
});

export const Vendor = mongoose.model('Vendor', VendorSchema);
