"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";
import { RoutePaths } from "@/lib/constants";

type Payload = {
  user_id: string;
  name: string;
  ingredients: string;
  instructions: string;
  modifications: string;
  thumbnail?: string;
  url?: string;
  website?: string;
};

export async function saveRecipeAction({
  user_id,
  name,
  ingredients,
  instructions,
  modifications,
  thumbnail,
  url,
  website,
}: Payload) {
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("recipes")
    .insert([
      {
        name,
        ingredients,
        instructions,
        modifications,
        user_id,
        thumbnail,
        url,
        website,
      },
    ])
    .select();

  if (error) {
    return null;
  }

  revalidatePath(RoutePaths.SAVED);

  return data;
}
