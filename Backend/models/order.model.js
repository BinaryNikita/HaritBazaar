import mongoose from 'mongoose';


const OrderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  billingDetails: {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    contactNumber: { type: String, required: true },
  },
  orderItems: {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, required: true },
  },
  
  orderStatus: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  paymentInfo: {
    method: { type: String, required: true },
    transactionId: { type: String },
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Failed'],
      default: 'Pending',
    },
  },
  orderDate: { type: Date, default: Date.now },
  estimatedDeliveryDate: { type: Date },
});

export const Order = mongoose.model('Order', OrderSchema);
