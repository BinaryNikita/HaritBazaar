import  nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
       user: 'nikita.works32@gmail.com',
       pass: 'zlks suzq qcwe bfpv'
    }
})

const sendOrderEmail = async (orderDetails) => {
    try {
      const mailOptions = {
        from: 'nikita.works32@gmail.com', 
        to: 'vishnoinikita376@gmail.com',                    
        subject: `New Order recieved`,
        html: `
          <h1>New Order Received</h1>
          
        `, 
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  
sendOrderEmail();