import { useIsSubscribed, useServerUserSession } from "@/lib/hooks";
import RecipeDetails from "./recipe-details";

export const dynamic = "force-dynamic";

export default async function Recipe() {
  const user = await useServerUserSession();

  if (!user) {
    return <div>User not found</div>;
  }

  const isSubscribed = await useIsSubscribed();

  return <RecipeDetails user={user} isSubscribed={isSubscribed} />;
}
