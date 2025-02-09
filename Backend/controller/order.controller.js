import { OrderServices } from '../services/order.service.js';
import { sendOrderEmail } from '../services/smtp.services.js';
import cartServices  from '../services/cart.services.js'

  // PLACE ORDER
export const placeOrder = async (request, response, next) => {
  try {
    let order = await OrderServices.placeOrder(request.body);
    console.log("Order: ", order);
    if (order) {
      const userEmail = request.user.email;
      let userOrder = await OrderServices.orderDetails(order.orderDetails._id);
      console.log("User order: ", userOrder);
      if(userOrder){
userOrder.userEmail = userEmail;
        await sendOrderEmail(userOrder);
        console.log("Order email sent");
      }
      
      response.status(200).json({ message: 'Order placed succesfully', operation: true });
    }
    else response.send({ message: 'Error while placing order', operation: false });
  } catch (err) {
    console.log(err);
  }
};

  // GET ORDERS FOR VENDOR
export const getVendorOrders = async (request, response, next) => {
  try {
    const userId = request.user._id;
    const orders = await OrderServices.getOrdersforVendor(userId);
    if (orders) response.json({ order: orders });
    else response.send('error while fetching orders');
  } catch (err) {
    console.log(err);
  }
};

  // GET ORDERS OF USER
export const getUserOrders = async (request, response, next) => {
  try {
    const userId = request.user._id;
    const orders = await OrderServices.getOrdersOfUser(userId);
    if (orders) response.json({ order: orders });
    else response.send('error while fetching orders');
  } catch (err) {
    console.log(err);
  }
};

  // GET ORDER DETAILS
export const getOrderDetails = async (request, response, next) => {
  try {
    const orderId = request.params.orderId;
    const details = await OrderServices.orderDetails(orderId);
    if (details) response.json({ detail: details });
    else response.send('error while fetching order details');
  } catch (err) {
    console.log(err);
  }
};

  // CANCEL ORDER
export const cancelOrder = async (request, response, next) => {
  try {
    const orderId = request.params.orderId;
    const isCancelled = await OrderServices.cancelOrder(orderId);
    if (isCancelled.operation) {
      const userEmail = request.user.email;
      isCancelled.userEmail = userEmail;
      isCancelled.status = 'Cancelled';

      await sendOrderEmail(isCancelled, userEmail); 
      response.send({'msg':'Order cancelled sucessfully', "operation": true});
    }
    else response.send({'msg':'error while cancelling the order','operation': false});
  } catch (err) {
    console.log(err);
    response.send({'msg':'Internal Server Error','operaton': false});
  }
};

  // BULK ORDER 
export const bulkOrder = async (request, response, next) => {
  try {
    const isPlaced = await OrderServices.bulkOrder(request.user._id, request.body.orderItems, request.body.billingDetails, request.body.paymentInfo);
    console.log(isPlaced)
    if (isPlaced) {
      response.send({'msg':'order placed succesfully',operation: true});
    } else {
      response.send({'msg':'Failed to place Order',operation: false})
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

  // UPDATE ORDER
export const updateOrder = async (request, response, next) => {
  try {
    const isUpdated = await OrderServices.updateOrder(request.params.orderId, request.body.status);
    if (isUpdated) {
      const userEmail = request.user.email;
      isUpdated.userEmail = userEmail;
      isUpdated.status = request.body.status;

      // await sendOrderEmail(isUpdated); 
      response.send({'msg':'Order updated sucessfully', 'operation': true});
    }
    else response.send({'msg':'error while accepting the order', 'operation': true});
  } catch (err) {
    
    console.log(err);
  }
};

  // GET ORDERS FOR ADMIN
export const getOrderForAdmin = async(req, res)=>{
  try {
    const result = await OrderServices.getOrdersforAdmin();
    if(result){
      res.send({"orders":result, "operation":true});
    }
    else res.send({"orders":result, "operation":false});
  } catch (error) {
    console.log(error)
    res.send({"msg":"Internal server error",operation: false})
  }
}