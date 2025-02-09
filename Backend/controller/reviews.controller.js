import { request, response } from "express";
import { reviewServices } from "../services/review.services.js";

export const getReviews = async (request, response) => {
  try {
    const reviews = await reviewServices.getReviews(request.params.productId)
    return response.status(200).json(reviews)
  }
  catch (error) {
    //  console.log(error);
    return response.status(404).json({ error: error.message });
  }
};

export const addReviews = async (request, response) => {
  try {
    const result = await reviewServices.addReviews(request.user._id, request.body.content, request.params.productId)
    return response.status(201).json(result);
  }
  catch (error) {
    return response.status(400).json({ message: "error.message" });
  }
};

export const updateReviews = async (request, response) => {
  try {
    const { reviewId } = request.params;
    const updateData = request.body;
    const result = await reviewServices.updateReviews(reviewId, updateData);
    return response.status(200).json(result)
  }
  catch (error) {
    return response.status(500).json({ message: "error.message" });
  }
};

export const removeReviews = async (request, response) => {
  try {
    const { reviewId } = request.params;
    const result = await reviewServices.deleteReviews(reviewId);
    return response.status(201).json({ message: "detele success", data: result })

  }
  catch (error) {
    return response.status(500).json({ message: "error.message" });
  }
};

export const canReview = async (req, res)=>{
  try {
    const result = await reviewServices.canReview(req.user._id, req.params.productId)
    if(result){
      return res.send({data: true})
    }
    res.send({data: false})
  } catch (err) {
    console.log(err);
    res.send({"operation": false, "msg": "Internal Server Error"})
  }
}