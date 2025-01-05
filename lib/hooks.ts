"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { TIME_OFFSET } from "./constants";

export const useServerUserSession = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

export const useIsSubscribed = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase.from("payments").select("*");

  const stripeInfo = data?.length ? data && data[0] : [];

  return !!(
    stripeInfo.stripe_price_id &&
    stripeInfo.stripe_current_period_end &&
    new Date(stripeInfo.stripe_current_period_end).getTime() + TIME_OFFSET >
    Date.now()
  );
};
