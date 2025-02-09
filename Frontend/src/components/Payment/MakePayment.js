// import { useRef } from "react"
// import { api } from "../../axios";
// import { data, useNavigate, useParams } from "react-router-dom";

// function MakePayment(){
//     const params = useParams();
//     const navigate = useNavigate();
//     const amt = useRef();
//     const handleSubmit = (event)=> {
//         event.preventDefault();
//         api.post('/payment/create-payment',{amount: amt.current.value}, {headers: {Authorization: localStorage.getItem('token')}} )
//         .then(res=>{
//             console.log(res.data.approvalUrl);
//             window.location.href = res.data.approvalUrl
//         })
//         .catch(err=>{
//             console.log(err);
//         })
//     }
//     return <>
//         <form onSubmit={handleSubmit}>
//             <input className="form-control" ref={amt} placeholder="enter amount" value={params.amount}/>
//             <button className="btn btn-success" type="submit">Pay</button>
//         </form>

//     </>
// }

// export default MakePayment;









// MakePayment.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { api } from '../../axios';

function MakePayment() {
    const params = useParams();
    const amount = params.amount;
    const location = useLocation();
    const orderData = location.state.orderData;
    console.log(orderData);
    const navigate = useNavigate();

    const handleSuccess = async()=>{
      const response = await api.post('/order/place-order', orderData, { headers: {Authorization: localStorage.getItem('token')} });
      console.log(response.data);
      if(response.data.operation){
        navigate('/orders')
      }
    }

  useEffect(() => {
    // Ensure PayPal SDK is loaded
    if (window.paypal) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                reference_id: "default",
                currency_code: "USD",
                value: amount, 
              },
            }],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            // alert('Transaction completed by ' + details.payer.name.given_name);
            if(details.status=="COMPLETED"){
              // const response = await api.post('/order/place-order', orderData, { headers });
              handleSuccess();
            }
            console.log(details.status);
          });
        },
        onCancel:()=>{
          console.log("Canceled");
        },
        onError: (err) => {
          console.error('PayPal Checkout onError', err);
          // Handle errors here
        },
      }).render('#paypal-button-container');
    }
  }, [amount]);

  return (
    <div>
      <h2>Pay Rs. {amount}</h2>
      <div id="paypal-button-container"></div>
    </div>
  );
}

export default MakePayment;
