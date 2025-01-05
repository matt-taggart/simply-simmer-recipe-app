import { useIsSubscribed, useServerUserSession } from "@/lib/hooks";
import { Overview } from "./overview";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

export default async function Index() {
  const user = await useServerUserSession();
  const isSubscribed = await useIsSubscribed();

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data } = await supabase
    .from("generations")
    .select("generation_count");
  const generationCount = data?.find(Boolean)?.generation_count;
  return (
    <div className="w-full">
      <Overview user={user} isSubscribed={isSubscribed} generationCount={generationCount} />
    </div>
  );
}
