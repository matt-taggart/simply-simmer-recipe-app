"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { RoutePaths } from "@/lib/constants";

type Payload = {
  userId: string;
  recipeId: string;
};

export async function deleteRecipeAction({ recipeId, userId }: Payload) {
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("recipes")
    .delete()
    .match({ id: recipeId, user_id: userId });

  if (error) {
    console.error("Error deleting row:", error);
    return;
  }

  revalidatePath(RoutePaths.SAVED);

  return data;
}
