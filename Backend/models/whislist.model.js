import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    wishlistName: { type: String, required: true, default: "Collections" },
    product_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

export const Whislist = mongoose.model('Wishlist', WishlistSchema);
