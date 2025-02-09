import { Cart } from "../models/cart.model.js";
import { Order } from "../models/order.model.js";
import { User } from "../models/users.model.js";
import { Whislist } from "../models/whislist.model.js";
import { Vendor } from '../models/vendor.model.js'
import { Product } from '../models/product.model.js'

export class AdminServices {
    // GET USER BY ID
    static async getUserById(userId) {
        try {
            const result = await User.findOne({ _id: userId }, { password: 0 })
            return result ? result : false;
        } catch (err) {
            console.log(err)
            return false;
        }
    }

    static async getUserOrder(userId) {
        try {
            const result = await Order.find({ user_id: userId }).populate('orderItems.product_id')
            return result ? result : false;
        } catch (err) {
            console.log(err)
            return false;
        }
    }

    static async getUserCart(userId) {
        try {
            const result = await Cart.findOne({ user_id: userId }).populate('cartItems.product_id')
            return result ? result : false;
        } catch (err) {
            console.log(err)
            return false;
        }
    }

    static async getUserWishlist(userId) {
        try {
            const result = await Whislist.find({ user_id: userId }).populate('product_id')
            return result ? result : false;
        } catch (err) {
            console.log(err)
            return false;
        }
    }


    static async getVendorById(vendorId) {
        try {
            const result = await Vendor.findOne({ user_id: vendorId }).populate('user_id')
            return result ? result : false;
        } catch (err) {
            console.log(err)
            return false;
        }
    }

    static async getVendorProducts(vendorId) {
        try {
            const result = await Product.find({ vendor_id: vendorId })
            return result ? result : false;
        } catch (err) {
            console.log(err)
            return false;
        }
    }

    static async getVendorOrder(vendorId) {
        const pendingOrders = await Order.find({}, { _id: 1, orderItems: 1, orderStatus: 1 });

        const result = await Product.find({ vendor_id: vendorId }, { name: 1 });
        const newArr = []

        for (let i = 0; i < result.length; i++) {
            for (let j = 0; j < pendingOrders.length; j++) {
                if ((result[i]._id).equals(pendingOrders[j].orderItems.product_id)) {
                    const obj = JSON.parse(JSON.stringify(pendingOrders[j]))
                    obj.name = result[i].name;
                    newArr.push(obj);
                }
            }
        }
        return newArr;

    } catch(err) {
        console.log(err);
    }
}