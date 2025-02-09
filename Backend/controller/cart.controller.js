import { request, response } from 'express';
import  CartService  from '../services/cart.services.js';

export const addToCart = async (request, response) => {
  try {
    let userId = request.user._id;
    const { productId, quantity } = request.body;
    const result = await CartService.addToCart(userId, productId, quantity);
    return response.status(200).json(result);
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .json({ message: 'internal server error', error });
  }
};

export const getCartItem = async (request, response) => {
  try {
    let userId = request.user._id;
    const result = await CartService.getCart(userId);
    return response.status(200).json({ message: 'get to cart', data: result });
  } catch (err) {
    // console.log(err);
    return response
      .status(500)
      .json({ message: 'Internal Server Error', error: err });
  }
};

export const deleteCartItem = async (request, response) => {
  try {
    let userId = request.user._id;
    const product_id = request.params.productId;
    const result = await CartService.deleteCart(userId, product_id);
    return response.status(200).json(result);
  } catch (err) {
    console.log(err);
    return response.status(500).json({ err: 'Internal server error' });
  }
};

// export const updateCart = async (request, response) => {
//   try {
  // let userId = request.user._id;
  //     const { productId, quantity } = request.body;
//     const result = await CartService.updateCart(user_id, productId, quantity);
//     return response.status(200).json(result);
//   } catch (err) {
//     return response.status(500).json({ err: 'error' });
//   }
// };
