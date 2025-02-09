import nodemailer from 'nodemailer';
import { generateOtp } from './otp.service.js';
import { storeOtp } from './otp.service.js';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
       user: 'nikita.works32@gmail.com', 
       pass: 'zlks suzq qcwe bfpv' 
    }
});


// ORDER CONFORMATION MAIL
export const sendOrderEmail = async (orderResponse, userEmail) => {
  try {
    // console.log('-------------------------------------');
    // console.log(orderResponse);
    // console.log('-------------------------------------');

    const { billingDetails, orderItems, _id, orderStatus, orderDate, estimatedDeliveryDate} = orderResponse;

    if (!userEmail) {
      console.error('User email not provided.');
      return;
    }

    const product = orderItems.product_id || {};
    const quantity = orderItems.quantity || 1;
    const total = (product.price - (product.discount || 0)) * quantity;

    const formattedOrderDate = new Date(orderDate).toLocaleDateString();
    const formattedDeliveryDate = new Date(estimatedDeliveryDate).toLocaleDateString();

    const mailOptions = {
      from: 'nikita.works32@gmail.com',
      to: userEmail,  
      subject: `Order ${orderStatus || 'Pending'} - Order ID: ${_id}`,
      html: `
        <h1>Order ${orderStatus || 'Pending'}</h1>
        <p><strong>Order ID:</strong> ${_id}</p>
        <p><strong>Order Date:</strong> ${formattedOrderDate}</p>
        <p><strong>Estimated Delivery Date:</strong> ${formattedDeliveryDate}</p>

        <h2>Billing Details</h2>
        <p><strong>Name:</strong> ${billingDetails.fullName}</p>
        <p><strong>Address:</strong> ${billingDetails.address}, ${billingDetails.city}, ${billingDetails.postalCode}</p>
        <p><strong>Contact:</strong> ${billingDetails.contactNumber}</p>

        <h2>Product Details</h2>
        <p><strong>Product Name:</strong> ${product.name || 'Not Found'}</p>
        <p><strong>Price:</strong> $${product.price || 'N/A'}</p>
        <p><strong>Discount:</strong> $${product.discount || 0}</p>
        <p><strong>Quantity:</strong> ${quantity}</p>
        <p><strong>Total Amount:</strong> $${total.toFixed(2)}</p>
      `,
    }; 

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

//   FORGOT PASSWORD
export const forgotPassword = async (email) => {
    const otp = generateOtp();
    try {
        const mailOptions = {
        from: 'nikita.works32@gmail.com',
        to: email,  
        subject: `Request for updating password`,
        html: `
          <h1>Here is the OTP to update your password: ${otp}</h1>
        `,
      };

      const info = await transporter.sendMail(mailOptions);
      if (info) {
        console.log('Email sent:', info.messageId);

        await storeOtp(email, otp);
        return otp; 
      } else {
        console.log("Unable to send OTP");
        return null;
      }
    } catch (err) {
        console.error("Error sending OTP:", err);
    }

    
};
