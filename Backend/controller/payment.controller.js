import paypal from "paypal-rest-sdk";
// import Payment from "../model/Payment.model.js"; // Correct import for default export

// Configure PayPal with your sandbox credentials
paypal.configure({
    mode: "sandbox",
    client_id: "AUL1ngYkKlxr97CQQolIahvJxFBoJ-UOsdVTkM5RchqvvOm-9En2GQO4UJRQ1cGhNT9caCdRC8SEFaeD",
    client_secret: "ELaK8JySF9KtesDlMaC_PzoB3XkT51J3xrlufpZKsTg24Z1FHPKmtDja1M657rvzEg9clvXevW8XbH0x",
});


export const createPayment = (req, res) => {
    const { amount } = req.body;

    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount. Please provide a valid donation amount." });
    }

    const create_payment_json = {
        intent: "sale",
        payer: { payment_method: "paypal" },
        redirect_urls: {
            return_url: "http://localhost:3000/orders",
            cancel_url: "http://localhost:3000/place-order/:productId",
        },
        transactions: [
            {
                amount: {
                    currency: "USD",
                    total: amount,
                },
                description: "Purchase Product",
            },
        ],
    };

    paypal.payment.create(create_payment_json, async (error, payment) => {
        try {
            if (error) {
                console.error("Error creating payment:", error);
                return res.status(500).json({ error: "Failed to create payment", details: error });
            }
            const approvalUrl = payment.links.find((link) => link.rel === "approval_url")?.href;

            if (!approvalUrl) {
                return res.status(500).json({ error: "Approval URL not found in PayPal response" });
            }

            return res.status(200).json({ approvalUrl });
        } catch (dbError) {
            console.error("Database error:", dbError);
        }
    });
};

export const executePayment = async (req, res) => {
    const { paymentId, payerId } = req.body;
    console.log(paymentId, payerId)
    if (!paymentId || !payerId) {
        return res.status(400).json({ error: "Both paymentId and payerId are required" });
    }

    const execute_payment_json = {
        payer_id: payerId,
    };

    // paypal.payment.execute(paymentId, execute_payment_json, async (error, payment) => {
    //     try {
            
    //         if (error) {
    //             console.error("Error executing payment:", error.response);
    //             return res.status(500).json({ error: "Error executing payment", details: error.response });
    //         }

    //         return res.status(200).json({
    //             message: "Payment successful! Thank you for your support.",
    //             paymentDetails: payment,
    //         });
    //     } catch (dbError) {
    //         console.error("Database error:", dbError);
    //         return res.status(500).json({ error: "Database error while updating payment", details: dbError });
    //     }
    // });
};