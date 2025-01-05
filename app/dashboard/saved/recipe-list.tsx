"use client";

import Link from "next/link";
import { useState } from "react";
import { PencilIcon } from "lucide-react";

import { DeleteRecipeButton } from "@/app/dashboard/saved/delete-recipe-button";
import { RoutePaths } from "@/lib/constants";

export const RecipesList = ({ user, data }) => {
  const [filterQuery, setFilterQuery] = useState("");
  const filteredRecipes =
    data?.filter((recipe) => recipe.name.toLowerCase().includes(filterQuery)) ||
    [];
  return (
    <div className="space-y-4 max-w-5xl mx-auto px-4 py-6">
      <div className="flex justify-between" data-id="9">
        <input
          className="flex h-10 rounded-md border border-input bg-background py-6 px-4 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full md:w-1/2 mb-8"
          placeholder="Filter recipes..."
          spellCheck="false"
          name="filter"
          onChange={() => setFilterQuery(event.target.value)}
        />
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Saved Recipes</h2>
        <div className="bg-white p-4 rounded-md shadow-md divide-y divide-gray-300">
          {filteredRecipes.length ? (
            <>
              {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="flex flex-col sm:flex-row flex-wrap sm:flex-nowrap justify-between items-center py-2 text-lg"
                >
                  <span className="p-2 text-gray-600 flex-2 md:flex-1 flex-2">
                    {recipe.name}
                  </span>
                  <div className="flex-shrink-0 flex items-center space-x-4">
                    <Link
                      className="text-gray-600 hover:text-gray-500 flex items-center space-x-1"
                      href={`${RoutePaths.SAVED}/${recipe.id}`}
                    >
                      <PencilIcon className="h-4 w-4 mr-1" />
                      <span>Edit</span>
                    </Link>
                    <DeleteRecipeButton
                      userId={user?.id}
                      recipeId={recipe.id}
                    />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="tremor-TableCell-root text-tremor-content py-4 px-2 text-lg">
              No recipes found. Try searching for a different recipe.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
