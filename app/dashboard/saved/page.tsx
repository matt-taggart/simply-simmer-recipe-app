import Link from "next/link";
import { cookies } from "next/headers";

import { createClient } from "@/utils/supabase/server";
import { RecipesList } from "./recipe-list";
import { RoutePaths } from "@/lib/constants";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function SavedRecipes() {
  const supabase = createClient(cookies());
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("recipes")
    .select("*")
    .eq("user_id", user?.id);

  return (
    <div className="w-full">
      {data?.length === 0 ? (
        <div className="max-w-2xl mx-auto">
          <div className="tremor-Card-root  relative w-full text-left ring-1 rounded-tremor-default bg-tremor-background ring-tremor-ring shadow-tremor-card dark:bg-dark-tremor-background dark:ring-dark-tremor-ring dark:shadow-dark-tremor-card border-tremor-brand dark:border-dark-tremor-brand p-6 mt-6 px-14 w-[65ch] ml-auto mr-auto mt-14">
            <p className="tremor-TableCell-root text-tremor-content">
              No saved recipes. Click{" "}
              <Link
                className="text-[#bd1e59] hover:underline font-bold"
                href={RoutePaths.OVERVIEW}
              >
                here
              </Link>{" "}
              to find one!
            </p>
          </div>
        </div>
      ) : (
        <RecipesList user={user} data={data} />
      )}
    </div>
  );
}
