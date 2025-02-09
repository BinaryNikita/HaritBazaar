import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    images: [{ type: String }], 
    videos: [{ type: String }], 
    comments: { type: String },
    author: { type: String, required: true },
    tags: [{ type: String }],
    rating: { type: Number },
    publishedDate: { type: Date, default: Date.now },
    isActive: {type: Boolean, default: true}
});
console.log(BlogSchema)
export const Blog = mongoose.model('Blog', BlogSchema);

