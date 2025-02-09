import { Cart } from '../models/cart.model.js';
import { Product } from '../models/product.model.js';

class CartService {
    // ADD TO CART
  static async addToCart(userId, productId, quantity) {
    try {
      let cart = await Cart.findOne({ user_id: userId });

      if (!cart) {
        cart = new Cart({
          user_id: userId,
          cartItems: [{ product_id: productId, quantity }],
        });
      } else {
        const existingProduct = cart.cartItems.find(
          (item) => item.product_id.toString() === productId
        );

        if (existingProduct) {
          // existingProduct.quantity += quantity;
          return { 'message':'Already in cart', 'operation': false};
        } else {
          cart.cartItems.push({ product_id: productId, quantity });
        }
      }

      const updatedCart = await cart.save();
      return { message: 'Cart updated successfully!', cart: updatedCart };
    } catch (error) {
      throw new Error(`Error adding to cart: ${error.message}`);
    }
  }

  static async getCart(userId) {
    try {
      const cart = await Cart.findOne({ user_id: userId }).populate('cartItems.product_id');
      if (!cart) {
        return { message: 'Cart is empty!', items: [], totalAmount: 0 };
      }

      const totalAmount = cart.cartItems.reduce((acc, item) => {
        return acc + (item.product_id.price * item.quantity);
      }, 0);

      return {
        message: 'Cart retrieved successfully!',
        cartItems: cart.cartItems,
        totalAmount,
      };
    } catch (error) {
      throw new Error(`Error retrieving cart: ${error.message}`);
    }
  }

  static async deleteCart(userId, productId) {
    try {
      const cart = await Cart.findOne({ user_id: userId });
      console.log(cart)
      if (!cart) {
        return { message: 'Cart not found!' };
      }

      cart.cartItems = cart.cartItems.filter(
        (item) => item.product_id.toString() != productId
      );
      await cart.save();
      return { message: 'Product removed from cart successfully!', cart };
    } catch (error) {
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
}

export default CartService;
