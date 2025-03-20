import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const amountInCents = Math.round(amount * 100); // Convert amount to cents
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Payment Error:", error);
    res.status(500).json({ error: "Payment processing failed" });
  }
});

export default router;
