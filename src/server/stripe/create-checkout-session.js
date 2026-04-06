import express from "express";
import cors from "cors";
import stripe from "stripe";

const app = express();

app.use(cors());
app.use(express.json());

const PAYMENT_CONFIRMATION_URL = `${process.env.FRONTEND_URL}/payment-confirmation`;

app.post("/create-checkout-session", async (req, res) => {
    const items = req.body.products.map((product) => ({
        price_data: {
            currency: "brl",
            product_data: {
                name: product.name,
            },
            unit_amount: parseInt(`${product.price * 100}`),
        },
        quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
        line_items: items,
        mode: "payment",
        success_url: `${PAYMENT_CONFIRMATION_URL}?success=true`,
        cancel_url: `${PAYMENT_CONFIRMATION_URL}?canceled=true`,
    });

    res.send({ url: session.url });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});