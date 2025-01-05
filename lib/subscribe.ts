"use server";

import { stripe } from "./config";

export async function subscribe({ email, userId, billingUrl }) {
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: billingUrl,
    cancel_url: billingUrl,
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    customer_email: email,
    allow_promotion_codes: true,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID ?? null,
        quantity: 1,
      },
    ],
    metadata: {
      userId: userId,
    },
  });

  return { url: stripeSession.url };
}
