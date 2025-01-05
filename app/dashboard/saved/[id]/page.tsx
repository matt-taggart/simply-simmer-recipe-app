import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import { ModifyRecipe } from "./modify-recipe";

export const dynamic = "force-dynamic";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>User not found</div>;
  }

  return <ModifyRecipe user={user} />;
}
