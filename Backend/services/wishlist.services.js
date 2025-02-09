import { request, response } from "express";
import { Whislist } from "../models/whislist.model.js";
export class WishlistService {
  static async addToWishlist(userId, productId, wishlistName) {
    try {

      // whilist check same name
      let wishlist = await Whislist.findOne({ user_id: userId, wishlistName });
      console.log(wishlist);
      if (wishlist) {
        if (wishlist.product_id.includes(productId)) return { "msg": "Item already exists", operation: false };

        wishlist.product_id.push(productId)
        await wishlist.save();
        return { "msg": "Success", operation: true }
      }
      const newwishlist = new Whislist({
        product_id: productId,
        user_id: userId,
        wishlistName
      });
      await newwishlist.save();
      return { message: "Product added to wishlist successfully", operation: true };
    } catch (err) {
      console.log(" Error adding item to wishlist", err)
      return { err: "error data add in wishlist", operation: false }
    }
  }

  static async getWishlist(userID) {
    try {
      let wishlist = await Whislist.find({ user_id: userID });
      // console.log(wishlist)
      if (wishlist.length > 0) {
        return { wishlist, operation: true }
      }
      else {
        return { wishlist, operation: false }
      }
    }
    catch (err) {
      return { err: "error fetching data", operation: false }
    }
  }

  static async removeWishlist(id) {
    try {
      let isIdExist = await Whislist.findById({ _id: id });
      if (!isIdExist) {
        return response.send({ message: " id not found", operation: false })
      }
      let wishlist = await Whislist.deleteOne({ _id: id });
      console.log(wishlist);
      if (wishlist) {
        return response.status(200).json({ message: "whishlist delete", operation: true });
      }
      else {
        return response.status(500).json({ error: " somthing went wrong", operation: false, code: 500 });
      }
    }
    catch (err) {
      return response.status(401).json({ err: "delete server error", operation: false });
    }
  }

  static async createWishlist(userId, name) {
    try {
      let wishlist = await Whislist.create({ user_id: userId, wishlistName: name });
      if (wishlist) {
        return wishlist
      } else false
    } catch (err) {
      console.log(err)
      return false;
    }
  }

  static async getWishlitItems(listId) {
  try {
    const list = await Whislist.findOne({ _id: listId }).populate('product_id');
    if (!list) {
      return { message: 'Wishlist is empty!', items: []};
    }

    return { message: 'successfully!', wishlistItems: list.product_id};
  } catch (error) {
    throw new Error(`Error retrieving cart: ${error.message}`);
  }
}

}