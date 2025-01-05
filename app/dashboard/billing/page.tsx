import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { Subscriptions } from "./subscriptions";
import { RoutePaths, TIME_OFFSET } from "@/lib/constants";
import { stripe } from "@/lib/config";

export const dynamic = "force-dynamic";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect(RoutePaths.LOGIN);
  }

  const { data } = await supabase.from("payments").select("*");

  const stripeInfo = data.length ? data[0] : [];

  const isSubscribed =
    stripeInfo.stripe_price_id &&
    stripeInfo.stripe_current_period_end &&
    new Date(stripeInfo.stripe_current_period_end).getTime() + TIME_OFFSET >
    Date.now();

  let isCanceled = false;
  if (isSubscribed && stripeInfo.stripe_subscription_id) {
    const stripePlan = await stripe.subscriptions.retrieve(
      stripeInfo.stripe_subscription_id
    );

    isCanceled = stripePlan.cancel_at_period_end;
  }

  const subscriptionPlan = {
    stripePriceId: stripeInfo.stripe_price_id,
    stripeSubscriptionId: stripeInfo.stripe_subscription_id,
    stripeCurrentPeriodEnd: stripeInfo.stripe_current_period_end,
    stripeCustomerId: stripeInfo.stripe_customer_id,
    isSubscribed,
    isCanceled,
  };

  return (
    <div className="w-full h-screen">
      <Subscriptions user={user} subscriptionPlan={subscriptionPlan} />
    </div>
  );
}
