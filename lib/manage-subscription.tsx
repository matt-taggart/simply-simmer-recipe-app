"use server";

import { stripe } from "./config";

export async function manageSubscription({ stripeCustomerId, billingUrl }) {
  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: billingUrl,
  });

  return { url: stripeSession.url };
}
