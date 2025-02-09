import { ProductServices } from './product.service.js';
import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';
import { Vendor } from '../models/vendor.model.js'
import { User } from '../models/users.model.js';
export class OrderServices {
  static async getOrdersforVendor(userId) {

    try {

      const pendingOrders = await Order.find({}, { _id: 1, orderItems: 1, orderStatus: 1 });

      const result = await Product.find({ vendor_id: userId }, { name: 1 });
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
      console.log(newArr)
      return newArr;

    } catch (err) {
      console.log(err);
    }
  }


  static async getOrdersOfUser(userId) {
    try {
      const orders = await Order.find({ user_id: userId }).populate("orderItems.product_id");
      if (orders) return orders;
      else false;
    } catch (err) {
      console.log(err);
    }
  }


  static async getAllOrders() {
    try {
      const orders = await Order.find();
      if (orders) return orders;
      else false;
    } catch (err) {
      console.log(err);
    }
  }


  static async orderDetails(orderId) {
    try {
      const order = await Order.findById(orderId).populate("orderItems.product_id");
      if (order) return order;
      else false;
    } catch (err) {
      console.log(err);
    }

  }

  static async getOrdersOfUser(userId) {
    try {
      const orders = await Order.find({ user_id: userId }).populate('orderItems.product_id');
      if (orders) return orders;
      else false;
    } catch (err) {
      console.log(err);
    }
  }

  static async getAllOrders() {
    try {
      const orders = await Order.find().populate('orderItems.product_id');
      if (orders) return orders;
      else false;
    } catch (err) {
      console.log(err);
    }
  }

  static async orderDetails(orderId) {
    try {
      const order = await Order.findById(orderId).populate('orderItems.product_id');
      if (order) return order;
      else false;
    } catch (err) {
      console.log(err);
    }
  }

  static async cancelOrder(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (order) {
        if(order.orderStatus=="Pending" || order.orderStatus=="Processing"){
          order.orderStatus = 'Cancelled';
          await order.save();
          return {'operation':true, order: order };
        }
        else return {'operation':false, 'msg':'Can not cancel order now, it is already Shipped'}
      } else return {'operaion':false, 'msg': 'Failed to cancel order'};
    } catch (err) {
      console.log(err);
    }
  }

  static async placeOrder(orderDetails) {
    try {
      const order = await Order.create(orderDetails);

      if (order) {
        let productId = orderDetails.orderItems.product_id;
        const product = await Product.findOne({ _id: productId });
        let count = product.buyCount + 1;
        product.buyCount = count;
        await product.save();
        const user = await User.findOne({ _id: orderDetails.user_id });
        const reward = parseFloat(((1.4 / product.carbonFootprint) * 10).toFixed(2));


        user.point = reward + user.point;
        await user.save();

        return { orderDetails: order };
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async bulkOrder(userId, orderItems, billingDetails, paymentInfo) {
    try {
      let allPlaced = true;
      for (let order of orderItems) {
        let result = await this.placeOrder({ user_id: userId, billingDetails, orderItems: order, paymentInfo });

        if (!result) {
          allPlaced = false;
          break;
        }
      }

      return allPlaced;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  static async countTotalAmount(orderDetails) {
    try {
      if (!Array.isArray(orderDetails)) {
        console.error('Expected orderDetails to be an array');
        return 0;
      }

      let bulkAmount = 0;

      for (let i = 0; i < orderDetails.length; i++) {
        const orderItems = orderDetails[i].orderItems;
        for (let item of orderItems) {
          let product = await ProductServices.getProductById(item.product_id);
          let quantity = item.quantity;
          bulkAmount += product.price * quantity;
        }
        console.log('Total Amount:', bulkAmount);

        return bulkAmount;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async updateOrder(orderId, data) {
    try {
      const order = await Order.findOne({ _id: orderId });
      console.log(order)
      if (order) {
        order.orderStatus = data;
        await order.save();
        return order;
      } else false;
    } catch (err) {
      console.log(err);
    }
  }

  static async getOrdersforAdmin() {
    try {
      return await Order.find().populate({ path: 'user_id', select: 'name' }).populate({ path: 'orderItems.product_id', select: '_id name price carbonFootprint discount' });
    }
    catch (err) {
      console.log(err)
      return false;
    }
  }

}
