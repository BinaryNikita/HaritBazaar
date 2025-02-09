// import express from "express";
import { WishlistService } from "../services/wishlist.services.js";
export const addToWishlist = async (request, response) => {
    try {
        const newWishlist = await WishlistService.addToWishlist(request.user._id, request.body.productId, request.body.wishlistName);
        if (newWishlist.operation) return response.status(201).json({ msg: 'data added in wishlist succesfully', operation: true });
        else {
            return response.send(newWishlist)
        }
    } catch (error) {
        return response.status(500).json({ msg: error.message, operation: false });
    }
};

export const getWishlist = async (request, response) => {
    try {
        const getlist = await WishlistService.getWishlist(request.user._id);
        if(getlist.wishlist.length==0){
            const result = await WishlistService.createWishlist(request.user._id)
            return response.status(200).json({ list: [result], operation: true });
        }
        return response.status(200).json({ list: getlist.wishlist, operation: true });
    }
    catch (error) {
        console.log(error)
        return response.status(500).json({ message: error.message });
    }
};

export const removeWishlist = async (request, response) => {
    try {
        let { id } = request.params;
        let result = await WishlistService.removeWishlist(id);
        return response.status(200).json({ message: "list delete succes" })
    }
    catch (err) {
        console.log(err)
        return response.status(401).json({ err: "delete server error" })
    }
}

export const createWishlist = async(req, res)=>{
    try{
        const result = await WishlistService.createWishlist(req.user._id, req.body.wishlistName)
        if(result){
            return res.send({operation:true})
        }else return res.send({operation:false})
    }catch(err){
        console.log(err);
        res.send({operation:false, msg: "Internal server error"})
    }
}

export const getWishlitItems = async (request, response) => {
    try {
      const result = await WishlistService.getWishlitItems(request.params.listId);
      return response.status(200).json({ message: 'Success', data: result });
    } catch (err) {
      // console.log(err);
      return response
        .status(500)
        .json({ message: 'Internal Server Error', error: err });
    }
  };