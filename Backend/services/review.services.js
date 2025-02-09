import { response } from "express"
import { Review } from "../models/review.model.js"
import { Order } from '../models/order.model.js'
export class reviewServices {
    static async getReviews(productId) {
        try {
            let reviews = await Review.find({ product_id: productId }).populate("user_id")
            return { message: "reviews succesfully", mydata: reviews, operation: true}
            // if (reviews.length > 0) {
            // }
            // else {
            //     return { message: "not found", operation: false }
            // }
        }
        catch (error) {
            console.log(error)
            return { err: "error review data", operation: false }
        }
    }

    static async addReviews(userId, content, productId) {
        try {
            const newReview = new Review({
                product_id: productId,
                user_id: userId,
                content: content
            })
            await newReview.save();
            return { message: "review added succesfully", operation: true }
        }
        catch (error) {
            return { message: "error adding review", operation: false}
        }
    }

    static async updateReviews(reviewId, updateData) {
        try {
            const updateReview = await Review.findByIdAndUpdate(reviewId, updateData);
            if (!updateReview) {
                return response.status(404).json({ message: "not found" })
            }
            return response.status(200).json({ message: "upadte succes", data: updateReview })
        }
        catch (error) {
            return response.status(500).json({ message: "error" })
        }
    }

    static async deleteReviews(reviewId) {
        try {

            const deleteReview = await Review.findByIdAndDelete(reviewId);
            if (!deleteReview) {
                return response.status(404).json({ message: "not found" })
            }
            return response.status(200).json({ message: "delete succes" })

        }
        catch (error) {
            return response.status(500).json({ message: "error" })
        }
    }

    static async canReview(userId, productId){
        try {
            const result = await Order.find({user_id: userId})
            console.log(result);
            return result.some(order=>order.orderItems.product_id==productId)
        } catch (err) {
            console.log(err)
            return false;
        }
    }

}