"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

type Payload = {
  id: string;
  user_id: string;
  name: string;
  ingredients: string;
  instructions: string;
  modifications: string;
};

export async function saveRecipeChangesAction({
  id,
  user_id,
  name,
  ingredients,
  instructions,
  modifications,
}: Payload) {
  const supabase = createClient(cookies());

  const { data, error } = await supabase
    .from("recipes")
    .update({ name, ingredients, instructions, modifications })
    .match({ user_id, id });

  if (error) {
    return null;
  }

  revalidatePath("/recipes");

  return data;
}
